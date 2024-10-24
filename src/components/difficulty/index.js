import { useEffect, useState } from 'react';
import styles from '../../styles/settings.module.css';

const Difficulty = () => {
    const [difficulty, setDifficulty] = useState();
    const [maxEnemies, setMaxEnemies] = useState(3);
    const [enemySpeed, setEnemySpeed] = useState(2);
    const [shootingTimeout, setShootingTimeout] = useState(400);
    const [maxLazers, setMaxLazers] = useState(3);

    const settings =
        [{
            difficulty: 'easy',
            maxEnemies: 2,
            enemySpeed: 1,
            shootingTimeout: 300,
            maxLazers: 2
        }, {
            difficulty: 'medium',
            maxEnemies: 3,
            enemySpeed: 2,
            shootingTimeout: 400,
            maxLazers: 3
        }, {
            difficulty: 'hard',
            maxEnemies: 4,
            enemySpeed: 3,
            shootingTimeout: 500,
            maxLazers: 4

        }]
    useEffect(() => {
        // get difficulty from local storage
        const difficulty = localStorage.getItem("difficulty");
        if (difficulty) {
            setDifficulty(difficulty);
        }
        else {
            setDifficulty(settings[1].difficulty);
            localStorage.setItem("difficulty", JSON.stringify(settings[1]));
        }
    }, []);

    const changeDifficulty = (difficulty) => {
        // save difficulty to local storage
        localStorage.setItem("difficulty", JSON.stringify(settings.find(setting => setting.difficulty === difficulty)));
        setDifficulty(difficulty);
    }

    const setCustomDifficulty = () => {
        const customSettings = {
            difficulty: 'custom',
            maxEnemies: maxEnemies,
            enemySpeed: enemySpeed,
            shootingTimeout: shootingTimeout,
            maxLazers: maxLazers
        }

        localStorage.setItem("difficulty", JSON.stringify(customSettings));
        setDifficulty('custom');
    }

    return (
        <div className={styles.difficultyScreen}>
            <div>

                <h2 className={styles.heading}>Set Difficulty</h2>
                <div className={styles.difficultyBtnSet}>
                    <button onClick={() => changeDifficulty('easy')} className={difficulty === 'easy' ? styles.difficultyBtnActive : styles.difficultyBtn}>Easy</button>
                    <button onClick={() => changeDifficulty('medium')} className={difficulty === 'medium' ? styles.difficultyBtnActive : styles.difficultyBtn}>Medium</button>
                    <button onClick={() => changeDifficulty('hard')} className={difficulty === 'hard' ? styles.difficultyBtnActive : styles.difficultyBtn}>Hard</button>
                </div>
            </div>
            <div className={styles.seperator} />
            <div>

                <h3 style={{ textAlign: 'center' }}>Custom Settings</h3>
                <div className={styles.customSettings}>
                    <label>Max Enemies</label>
                    <input type="number" value={maxEnemies} onChange={(e) => setMaxEnemies(e.target.value)} />

                    <label>Enemy Speed</label>
                    <input type="number" value={enemySpeed} onChange={(e) => setEnemySpeed(e.target.value)} />

                    <label>Shooting Timeout</label>
                    <input type="number" value={shootingTimeout} onChange={(e) => setShootingTimeout(e.target.value)} />

                    <label>Max Lazers</label>
                    <input type="number" value={maxLazers} onChange={(e) => setMaxLazers(e.target.value)} />

                    <div />
                    <button onClick={setCustomDifficulty} className={styles.difficultyBtn}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Difficulty