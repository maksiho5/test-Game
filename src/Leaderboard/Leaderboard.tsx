

import Image from 'next/image'
import './Leaderboard.css'
import useStoreCoins from '@/store/TokenUser'
export default function Leaderboard() {
    const leaderboard = useStoreCoins(state => state.leaderboard)


    return (
        <>
            <div className="leaderboard">
                <h2>Таблица лидеров</h2>

                <div className="leaderboard_table">
                    {leaderboard.map((el: {name: string, coins: number | string, place: string | number}, index) => {
                        const firstName = el.name.split('')[0]
                        return <div className="leader_con" key={el.place}>
                            <div className="leader" >
                                <div className="firs_word_lider">А</div>
                                <div className="data_leaderboard">
                                    <div className="name_leaderboard">Анонимно</div>
                                    <div className="coins_leaderboard_conteiner">
                                        <div className="coins_leaderboard">{el.coins}</div>
                                        <Image src="./valute_harek.png" alt="Coins" width={22} height={22} />
                                    </div>
                                </div>
                            </div>
                            <div className="place_leaderboard">{el.place}</div>
                        </div>
                    })}


                </div>
            </div>
        </>
    )
}