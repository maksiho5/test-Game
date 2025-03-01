'use client'
import Image from 'next/image';
import { useCallback, useEffect, useState } from "react";
import './HarekHome.css'
import QuestionsModal from "../QuestionsModal/QuestionsModal";
import { log } from "node:console";
import useStoreCoins from '@/store/TokenUser';

export default function Harek({userId}: {userId: number | string}) {

    const [force, setForce] = useState(0);
    const [isClicking, setIsClicking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [forceValue, setForceValue] = useState(0);

    const addCoins = useStoreCoins(state => state.addCoins)
    const coins = useStoreCoins(state => state.coins)
    const multiplyer = useStoreCoins(state => state.multiplyer)
    const buyMultiplyerStore = useStoreCoins(state => state.buyMultiplyerStore)
    const nextMultiplyerCost = useStoreCoins(state => state.nextMultiplyerCost)



    const [click, setClick] = useState(0);

    const clickValue = 1;
    const clickDelay = 100;
    let timeoutId: any = null;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedForce = localStorage.getItem("force");
            setForceValue(storedForce == null ? 0 : parseInt(storedForce, 10));
            setForce(storedForce == null ? 0 : parseInt(storedForce, 10));
        }
    }, [])



    const handleClick = useCallback(() => {

        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
            return;
        }

        // setTimeout(() => {
        //     console.log(click);
            
        //     if(click > 2){
        //         alert("dfsdds")
                
        //     }
        // }, 1000)
        setIsClicking(true);
        addCoins()
        setForce((prevCoins) => {
            const newForce = prevCoins + clickValue;
            if (typeof window !== 'undefined') {
                const storedForce = localStorage.getItem("force");
                if (storedForce == null) {
                    localStorage.setItem("force", "0")
                } else {
                    localStorage.setItem("force", JSON.stringify(newForce))
                    setForceValue(storedForce == null ? 0 : parseInt(storedForce));
                }

            }

            if (prevCoins + clickValue == 6500) {
                setIsModalOpen(true);
                setForce(0)
                setForceValue(0)
                localStorage.setItem("force", "0")

            }
            return prevCoins + clickValue
        });
        setClick((el ) => el + 1)


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


    const buyMultiplyer = () => {
        
        if(coins >= nextMultiplyerCost){
            buyMultiplyerStore()
            console.log(2);
            
        }else {
            alert("У вас не хватает денег")
        }
    }



console.log(nextMultiplyerCost);
console.log(multiplyer);


    return (
        <>
            <div className="container">
                <header className="header">
                    <h1>Harek Slap</h1>
                    <p>Кликайте на хорька и зарабатывайте монеты!</p>
                    <p className='user_id'>Ваш id: <b>{userId}</b></p>
                </header>

                <div className="interactions">
                    <div className="coins">
                        <Image src="./valute_harek.png" alt="Coins" width={50} height={50} />
                        <h1 className="coins_number">{coins}</h1>
                    </div>
                    <div className={`cliker ${isClicking ? 'clicked' : ''}`} onClick={handleClick}>
                        <div className={`harek`} >
                            <Image src="./harek.png"  alt="Harek" width={150} height={150}  />
                        </div>
                        <div className={`round_harek ${isClicking ? 'clicked' : ''}`} >
                            <div className={`harek`} >
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
                        <h2>{forceValue}/6500</h2>
                    </div>
                </div>

                <section className="upgrades">
                    <h2>Улучшения</h2>
                    <div className="upgrade-list">
                        <div className="upgrade-item">
                            <h1 id='1'>{multiplyer}</h1>
                            <div>
                                <h3>Улучшить уровень</h3>
                                <div className="buy_multiplyer">
                                    <button onClick={buyMultiplyer}>Улучшить ={'>'} {multiplyer + 1}</button>
                                    <h4>Цена: {nextMultiplyerCost}</h4>
                                    <div className="lock">
                                        {/* <Image src="/lock.png" alt="Lightning" style={{ filter: 'invert(100%)' }} width={20} height={20} /> */}
                                    </div>
                                </div>
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
                    {/* <ul>
                        <Image src="/kirca.svg" alt="Kirca Icon" width={50} height={50} />
                        <li>
                            <a href="#">Прокачка</a>
                        </li>
                    </ul> */}
                </div>

                <QuestionsModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </>
    );
}

