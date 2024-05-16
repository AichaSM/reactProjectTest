import profilePic from './../assets/pic-profil.png';
import styles from './../assets/UserProfileCard.module.css';

function UserProfileCard({jobName, jobTitle}) {
    return (
        <div className={styles.card}>
            <img src={profilePic} alt='Profile' className={styles.profileImg}/>
            <div className={styles.userInfo}>
                <h2>{jobName}</h2>
                <p>{jobTitle}</p>
            </div>
        </div>
    )
}
 export default UserProfileCard;
