'use client';

import './page.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Harek from '@/HarekHome/HarekHome';

import useStoreCoins from '@/store/TokenUser';
// Определяем тип для TelegramWebApp (замените 'any' на более конкретный тип, если возможно)
type TelegramWebAppType = any; // Или null

export default function Home() {
    const [userId, setUserId] = useState(0);
    const [TelegramWebApp, setTelegramWebApp] = useState<TelegramWebAppType | null>(null); // Состояние для TelegramWebApp
    const getBalance = useStoreCoins(state => state.getBalance)
    const getMultiplyer = useStoreCoins(state => state.getMultiplyer)
    useEffect(() => {

        import('@twa-dev/sdk')
            .then((module) => {
                const TWA = module.default;
                setTelegramWebApp(TWA);
                TWA.ready();
                TWA.expand();
            })
            .catch((error) => {
                console.error('Failed to load TelegramWebApp:', error);
            });
    }, []);

    useEffect(() => {
        if (TelegramWebApp) {
            const user = TelegramWebApp.initDataUnsafe?.user;

            console.log(user);
            if (user) {
                setUserId(user.id);
            }
        }
    }, [TelegramWebApp]);

    useEffect(() => {
        // getBalance()
        // getMultiplyer()
    }, [])
    // if (typeof window !== "undefined") {
    //     window.addEventListener("load", () => {
    //         getBalance()
    //         getMultiplyer()
    //     })
    // }


    return (
        <div className="backround">
            <h1 className='white'>{userId}</h1>
            <Harek />

        </div>
    );
}