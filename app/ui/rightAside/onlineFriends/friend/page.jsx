import style from './friend.module.css';

export default function Friend() {
    return (
        <div className={style.friendItem}>
            <div className={style.friendItemAvatarContainer}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0HlU2uMwQU59CQzo7CTg_gi6at9evlDeCXQ&s" alt="Мария Иванова" className={style.friendAvatar}></img>
                <div className={style.onlineIndicator}></div>
            </div>
            <div className={style.friendInfo}>
                <p className={style.friendName}>Мария Иванова</p>
                <p className={style.status}>В сети</p>
            </div>
        </div>
    )
}