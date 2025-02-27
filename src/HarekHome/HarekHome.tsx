'use client'
import Image from 'next/image';
import { useCallback, useEffect, useState } from "react";
import './HarekHome.css'
import QuestionsModal from "../QuestionsModal/QuestionsModal";
import { log } from "node:console";

export default function Harek() {
    const [coins, setCoins] = useState(0);
    const [force, setForce] = useState(6490);
    const [isClicking, setIsClicking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const clickValue = 1;
    const clickDelay = 100;
    let timeoutId: any = null;


    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                )
            );
        };

        checkIsMobile(); // Проверяем при монтировании компонента
        window.addEventListener("resize", checkIsMobile); // И при изменении размера окна

        return () => {
            window.removeEventListener("resize", checkIsMobile); // Убираем слушатель при размонтировании
        };
    }, []);

    const handleClick = useCallback(() => {
        if (!isMobile) return; // Прекращаем выполнение, если не мобильное устройство

        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
            return;
        }

        setIsClicking(true);
        setCoins((prevCoins) => prevCoins + clickValue);
        setForce((prevCoins) => {
        console.log(prevCoins + clickValue);
            if (prevCoins + clickValue == 6500) {
                setIsModalOpen(true);
                setForce(0)
            }
            return prevCoins + clickValue
        });

        

        timeoutId = setTimeout(() => {
            setIsClicking(false);
            timeoutId = null;
        }, clickDelay);
    }, [isMobile]);

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, []);

    if (!isMobile) {
        return (
            <div className="container">
                <h1>Пожалуйста, зайдите с мобильного устройства</h1>
                <p>Эта игра разработана специально для мобильных устройств.</p>
            </div>
        );
    }
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };




    return (
        <>
            <div className="container">
                <header className="header">
                    <h1>Harek Clicker</h1>
                    <p>Кликайте на хорька и зарабатывайте монеты!</p>
                </header>

                <div className="interactions">
                    <div className="coins">
                        <Image src="/valute_harek.png" alt="Coins" />
                        <h1 className="coins_number">{coins}</h1>
                    </div>
                    <div className={`cliker ${isClicking ? 'clicked' : ''}`} onClick={handleClick}>
                        <div className={`harek`}>
                            <Image src="/harek.png" alt="Harek" />
                        </div>
                        <div className={`round_harek ${isClicking ? 'clicked' : ''}`} onClick={handleClick}>
                            <div className={`harek`}>
                                <Image src="/round_harek.svg" alt="Round Harek" />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="force_container">
                    <div className="force_block">
                        <div className="lightning">
                            <Image src="/lightning.svg" alt="Lightning" />
                        </div>
                        <h2>{force}/6500</h2>
                    </div>
                </div>

                <section className="upgrades">
                    <h2>Улучшения</h2>
                    <div className="upgrade-list">
                        {/*  Здесь будут элементы улучшений  */}
                        <div className="upgrade-item">
                            <Image src="/hamster.svg" alt="Улучшение 1" />
                            <div>
                                <h3>Автокликер</h3>
                                <p>Автоматически кликает за вас.</p>
                                <button>Купить (100 монет)</button>
                            </div>
                        </div>
                        <div className="upgrade-item">
                            <Image src="/hamster.svg" alt="Улучшение 2" />
                            <div>
                                <h3>Удвоение клика</h3>
                                <p>Увеличивает количество монет за клик.</p>
                                <button>Купить (250 монет)</button>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="menu">
                    <ul>
                        <li>
                            <Image src="/icon_bitcon.svg" alt="Bitcon Icon" />
                        </li>
                        <li>
                            <a href="#">Главная</a>
                        </li>
                    </ul>
                    <ul>
                        <Image src="/kirca.svg" alt="Kirca Icon" />
                        <li>
                            <a href="#">Прокачка</a>
                        </li>
                    </ul>
                </div>

                <QuestionsModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </>
    );
}

