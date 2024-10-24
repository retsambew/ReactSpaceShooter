import { Link } from 'react-router-dom'
import styles from '../../styles/help.module.css'

const HelpScreen = () => {
    return (
        <div className={styles.helpScreen}>
            <h1 className={styles.helpScreenHeading}>How to play</h1>
            <div className={styles.helpScreenContainer}>
                <div>
                    <h1>Play in full screen for better experience</h1>
                    <p>Press <strong>F11</strong> to Enter/Exit Full Screen Mode</p>
                </div>
                <div>
                    <h2>Controls</h2>
                    <p>Use mouse/trackpad to steer your space craft.</p>
                    <p><strong>Left Click</strong> to shoot the obstacles.</p>
                    <p>Press <strong>esc</strong> to pause the game, <strong>shoot</strong> to continue.</p>
                </div>
                <div>
                    <h2>Game Logic</h2>
                    <p>Shooting a meteor is rewarded with 10 points.</p>
                    <p>Meteor speed increases after every 50 points earned</p>
                    <p>Meteor count increases after first 50 points and then every 100 points earned</p>
                    <p>if you shoot a meteor and die at the same time, it’ll not count in hi-score</p>
                </div>
                <div>
                    <Link to="/play" className={styles.playNowButton}>Play Now!</Link>
                </div>
            </div>
        </div>
    )
}

export default HelpScreen