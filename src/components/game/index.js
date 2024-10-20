import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/game.module.css";
import useSound from 'use-sound'
import shootSound from "../../assets/audio/shoot.mp3";
import gameoverSound from "../../assets/audio/gameover.mp3";
import explosionSound from "../../assets/audio/explosion.mp3";

const Game = () => {
  const player = useRef(null);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [uid, setUid] = useState(0);
  const [lazers, setLazers] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [enemyCount, setEnemyCount] = useState(0);
  const [enemySpeed, setEnemySpeed] = useState(2);
  const [maxEnemies, setMaxEnemies] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);

  const [playShootSound] = useSound(shootSound, { volume: 0.25 });
  const [playGameOverSound] = useSound(gameoverSound, { volume: 0.25 });
  const [playExplosionSound] = useSound(explosionSound, { volume: 0.25, sprite: { explosion: [0, 1000] } });

  // Load high score from local storage and pause game on escape key press
  useEffect(() => {
    const highScore = localStorage.getItem("highScore");
    if (highScore) {
      setHighScore(highScore);
    }

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setGamePaused(true);
      }
    });

    return () => window.removeEventListener("keydown", () => { });
  }, []);

  // Player movement control
  const mouseMove = (event) => {
    if (event.clientX > 90)
      player.current.style.left = event.clientX - 90 + "px";
  }

  // Player shooting control
  const shoot = () => {
    if (gamePaused) setGamePaused(false);
    if (lazers.length > 3) return;
    playShootSound();
    setLazers([
      ...lazers,
      {
        id: uid,
        x: player.current.getBoundingClientRect().left,
        y: player.current.getBoundingClientRect().top,
      },
    ]);
    setUid(uid + 1);
  };

  // Check for collisions between lazers, enemies and player
  const checkCollisions = () => {
    for (let i = 0; i < enemies.length; i++) {
      for (let j = 0; j < lazers.length; j++) {
        if (
          enemies[i].x < lazers[j].x + 80 &&
          enemies[i].x + 80 > lazers[j].x &&
          enemies[i].y < lazers[j].y + 80 &&
          enemies[i].y + 80 > lazers[j].y
        ) {
          playExplosionSound({ id: "explosion" });
          setScore(score + 10);
          setEnemyCount(enemyCount - 1);
          setEnemies(enemies.filter((enemy) => enemy.id !== enemies[i].id));
          setLazers(lazers.filter((lazer) => lazer.id !== lazers[j].id));
        }
      }

      const left = player.current.getBoundingClientRect().left;
      const top = player.current.getBoundingClientRect().top;
      if (
        (enemies[i].x < left + 50 &&
          enemies[i].x + 50 > left &&
          enemies[i].y < top + 50 &&
          enemies[i].y + 50 > top)
        ||
        (enemies[i].x < left + 80 &&
          enemies[i].x + 80 > left &&
          enemies[i].y < top + 50 &&
          enemies[i].y + 20 > top)
      ) {
        gameover();
      }
    }
  }

  // Update positions of lazers and enemies
  const updatePositions = () => {
    setLazers(
      lazers.map((lazer) => lazer.y > -100 ? ({
        ...lazer,
        y: lazer.y - 5,
      }) : null).filter((lazer) => lazer !== null)
    );

    setEnemies(
      enemies.map((enemy) => enemy.y < window.innerHeight ? ({
        ...enemy,
        y: enemy.y + enemySpeed,
      }) : null).filter((enemy) => enemy !== null)
    );
    setEnemyCount(enemies.length);

    if (score > 0 && score % 50 === 0 && score !== lastScore) {
      setEnemySpeed(enemySpeed + 0.25);
      setMaxEnemies(maxEnemies + 0.5);
      setLastScore(score);
    }

    checkCollisions();
  };

  // Render lazers
  const renderLazers = () => {
    return lazers.map((lazer) => (
      <div key={lazer.id} className={styles.lazerBox} style={{ left: lazer.x, top: lazer.y }} >
        <div className={styles.lazer} />
        <div className={styles.lazer} />
      </div >
    ));
  };

  // Generate enemies
  const generateEnemies = () => {
    if (enemyCount < maxEnemies) {
      setEnemies([
        ...enemies,
        {
          id: uid,
          x: Math.floor((window.innerWidth - 100) * Math.random()),
          y: -10,
        },
      ], enemies);
      setUid(uid + 1);
      setEnemyCount(enemyCount + 1);
    }
  };

  // Render enemies
  const renderEnemies = () => {
    return enemies.map((enemy) => (
      <div key={enemy.id} className={styles.meteor} style={{ left: enemy.x, top: enemy.y }} />
    ));
  };

  // Game over screen and save high score
  const gameover = () => {
    playGameOverSound();
    if (score > highScore) {
      localStorage.setItem("highScore", score);
      setHighScore(score);
      // alert("Game Over! New Hi-Score: " + score);
    }
    else {
      // alert("Game Over! Score: " + score);
    }
    setGameOver(true);
  };

  // update positions and generate enemies
  useEffect(() => {
    if (gameOver || gamePaused) return;
    const interval = setInterval(() => {
      updatePositions();
      generateEnemies();
    }, 1000 / 60);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enemies, lazers]);

  return (
    <div className={styles.display}>
      {gameOver ?
        (<div className={styles.gameover}>
          <div className={styles.gameoverInfo}>
            <h1>Game Over!</h1>
            <h2>Score: {score}</h2>
            <h2>High Score: {highScore}</h2>
            <button className={styles.gameoverButton} onClick={() => window.location.reload()}>Play Again</button>
            <button className={styles.gameoverButton} onClick={() => window.location.href = "/"}>Go Home</button>
          </div>
        </div>) :
        <div className={styles.gameArea} onClick={shoot} onMouseMove={mouseMove}>
          {renderEnemies()}
          {renderLazers()}

          <div className={styles.score}>
            <p>High Score: {highScore} </p>
            <p>Score: {score}</p>
          </div>
          <div>
            <div id={styles.player} ref={player}></div>
          </div>
        </div>
      }
    </div>
  );
};

export default Game;
