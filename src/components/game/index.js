import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/game.module.css";

const Game = () => {
  const player = useRef(null);
  const playerLazer = useRef(null);
  // const [flag, setFlag] = useState(true);
  let keysPressed = {};
  const Controls = (event) => {
    keysPressed[event.key] = true;
    const offset = 10; //pixel
    var playerObject = player.current.getBoundingClientRect();
    if (keysPressed["ArrowLeft"] && playerObject.left > 0) {
      player.current.style.left = playerObject.left - offset + "px";
    }
    if (keysPressed["ArrowRight"] && playerObject.right < window.innerWidth) {
      player.current.style.left = playerObject.left + offset + "px";
    }
    if (playerLazer.current.className === "" && keysPressed[" "]) {
      shoot();
    }
  };
  const shoot = () => {
    // setFlag(false);
    playerLazer.current.className = styles.shoot;
    playerLazer.current.style.left =
      player.current.getBoundingClientRect().left + "px";
    setTimeout(() => {
      playerLazer.current.className = "";
      // setFlag(true);
    }, 550);
  };
  useEffect(() => {
    document.addEventListener("keydown", Controls);
    document.addEventListener("keyup", (event) => {
      delete keysPressed[event.key];
    });
  }, []);

  return (
    // <div onClick={() => flag && shoot()}>
    <div>
      <div className={styles.gameArea}>
        <div>
          <div id={styles.player} ref={player}></div>
          <div id={styles.laser} ref={playerLazer}>
            <div className={styles.playerLaserLeft} />
            <div className={styles.playerLaserRight} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
