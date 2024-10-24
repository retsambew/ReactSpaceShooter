import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/home.module.css';

const Home = () => {
  const [highScore, setHighScore] = useState(0);
  useEffect(() => {
    const highScore = localStorage.getItem('highScore');
    if (highScore) {
      setHighScore(highScore);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imgSection}><div className={styles.bgImg} /></div>
      <div className={styles.score}>
        <h2>Hi-Score: {highScore}</h2>
      </div>
      <figure className={styles.planet1} />
      <figure className={styles.planet2} />
      <figure className={styles.threeCraft} />
      <div className={styles.menu}>
        <Link to='/play' className={styles.menuOption}><h2>Play</h2></Link>
        <hr />
        <Link to='/help' className={styles.menuOption}><h2>Help</h2></Link>
        <hr />
        <Link to='/difficulty' className={styles.menuOption}><h2>Difficulty</h2></Link>
      </div>
    </div>
  )
}

export default Home