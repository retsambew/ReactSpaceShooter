import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/game.module.css";

const Game = () => {
  const player = useRef(null);
  const playerLazer = useRef(null);
  const [flag, setFlag] = useState(true);
  const Controls = (event) => {
    const offset = 10; //pixel
    var playerObject = player.current.getBoundingClientRect();
    if (event.key === "ArrowLeft" && playerObject.left > 0) {
      player.current.style.left = playerObject.left - offset + "px";
    } else if (
      event.key === "ArrowRight" &&
      playerObject.right < window.innerWidth
    ) {
      player.current.style.left = playerObject.left + offset + "px";
    } else if (event.key === " ") {
      if (flag) {
        setFlag(false);
        shoot();
      }
    }
  };
  const shoot = () => {
    playerLazer.current.className = styles.shoot;
    setTimeout(() => {
      playerLazer.current.className = "";
      setFlag(true);
    }, 1000);
  };
  useEffect(() => {
    document.addEventListener("keydown", Controls);
  }, []);

  return (
    <div>
      <div className={styles.gameArea}>
        <div>
          <div id={styles.player} ref={player}>
            <div id={styles.laser} ref={playerLazer}>
              <div className={styles.playerLaserLeft} />
              <div className={styles.playerLaserRight} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
