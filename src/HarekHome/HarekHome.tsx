'use client'
import Image from 'next/image';
import { useCallback, useEffect, useState } from "react";
import './HarekHome.css'
import QuestionsModal from "../QuestionsModal/QuestionsModal";
import { log } from "node:console";
import useStoreCoins from '@/store/TokenUser';

export default function Harek() {
    const [coins, setCoins] = useState(0);
    const [force, setForce] = useState(6490);
    const [isClicking, setIsClicking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const addCoins = useStoreCoins(state => state.addCoins)

    const clickValue = 1;
    const clickDelay = 100;
    let timeoutId: any = null;




    const handleClick = useCallback(() => {

        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
            return;
        }

        setIsClicking(true);
        setCoins((prevCoins) => prevCoins + clickValue);
        addCoins()
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
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, []);


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
                        <Image src="./valute_harek.png" alt="Coins" width={50} height={50} />
                        <h1 className="coins_number">{coins}</h1>
                    </div>
                    <div className={`cliker ${isClicking ? 'clicked' : ''}`} onClick={handleClick}>
                        <div className={`harek`} onClick={handleClick}>
                            <Image src="./harek.png" alt="Harek" width={150} height={150} />
                        </div>
                        <div className={`round_harek ${isClicking ? 'clicked' : ''}`} onClick={handleClick}>
                            <div className={`harek`} onClick={handleClick}>
                                <Image src="./round_harek.svg" alt="Round Harek" width={100} height={100} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="force_container">
                    <div className="force_block">
                        <div className="lightning">
                            <Image src="./lightning.svg" alt="Lightning" width={50} height={50} />
                        </div>
                        <h2>{force}/6500</h2>
                    </div>
                </div>

                <section className="upgrades">
                    <h2>Улучшения</h2>
                    <div className="upgrade-list">
                        <div className="upgrade-item">
                            <Image src="./hamster.svg" alt="Улучшение 1" width={50} height={50} />
                            <div>
                                <h3>Автокликер</h3>
                                <p>Автоматически кликает за вас.</p>
                                <button>Купить (100 монет)</button>
                            </div>
                        </div>
                        <div className="upgrade-item">
                            <Image src="./hamster.svg" alt="Улучшение 2" width={50} height={50} />
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
                        <li className='list_style'>
                            <Image src="./icon_bitcon.svg" alt="Bitcon Icon" width={50} height={50} />
                        </li>
                        <li>
                            <a href="#">Главная</a>
                        </li>
                    </ul>
                    <ul>
                        <Image src="./kirca.svg" alt="Kirca Icon" width={50} height={50} />
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

