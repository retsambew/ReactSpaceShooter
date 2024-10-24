import styles from '../../styles/overlay.module.css';

const gamePauseOverlay = () => {
    return (
        <div className={styles.pauseOverlay}>
            <div className={styles.pauseOverlayContent}>
                <h1>Game Paused</h1>
                <p><strong>Shoot</strong> to resume</p>
            </div>
        </div>
    )
}

export default gamePauseOverlay