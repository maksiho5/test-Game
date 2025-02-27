'use client';

import './page.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';


// Определяем тип для TelegramWebApp (замените 'any' на более конкретный тип, если возможно)
type TelegramWebAppType = any; // Или null

export default function Home() {
    const [userId, setUserId] = useState(0);
    const [TelegramWebApp, setTelegramWebApp] = useState<TelegramWebAppType | null>(null); // Состояние для TelegramWebApp

    useEffect(() => {
        // Динамический импорт библиотеки
        import('@twa-dev/sdk')
            .then((module) => {
                const TWA = module.default;
                setTelegramWebApp(TWA); // Сохраняем TWA в состоянии
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
    }, [TelegramWebApp]); // Зависимость от TelegramWebApp

    return (
        <div className="backround">
            <h1>Jsdkdkalk</h1>
        </div>
    );
}