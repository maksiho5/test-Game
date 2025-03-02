'use client';

import './page.css';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import Harek from '@/HarekHome/HarekHome';

import useStoreCoins from '@/store/TokenUser';
// Определяем тип для TelegramWebApp (замените 'any' на более конкретный тип, если возможно)
type TelegramWebAppType = any; // Или null

export default function Home() {
    const userId = useStoreCoins(state => state.userId)
    const [TelegramWebApp, setTelegramWebApp] = useState<TelegramWebAppType | null>(null); // Состояние для TelegramWebApp
    const getBalance = useStoreCoins(state => state.getBalance)
    const getMultiplyer = useStoreCoins(state => state.getMultiplyer)
    const registerUser = useStoreCoins(state => state.registerUser)
    const leaderboardGet = useStoreCoins(state => state.leaderboardGet)
    const addUserId = useStoreCoins(state => state.addUserId)
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
                addUserId(user.id);
            }
        }
    }, [TelegramWebApp]);

    useEffect(() => {
        registerUser()
        getBalance()
        getMultiplyer()
        leaderboardGet()
    }, [])


    if (userId == 0) {
        return <>
            <div className="backround">
                <h1 className='erroy_id'>Зайдите с телеграмма или зарегестрируетесь</h1>
            </div>
        </>
    }



    return (
        <div className="backround">
            <Harek  />

        </div>
    );
}