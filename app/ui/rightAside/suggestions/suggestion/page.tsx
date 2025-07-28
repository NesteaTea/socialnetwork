import { cn } from "@/lib/utils";
import style from './suggestion.module.css';

export default function Suggestion() {
    return (
        <div className={style.suggestionItem}>
            <div className={style.suggestionProfile}>
                <img src="https://i.pinimg.com/474x/fc/61/bd/fc61bd0d0c513527b57cccd8c179f51f.jpg?nii=t" alt="Мария Иванова" className={style.suggestionAvatar} />
                <div className={style.suggestionInfo}>
                    <p className={style.suggestionName}>Мария Иванова</p>
                    <p className={style.suggestionDescription}>12 общих друзей</p>
                </div>
                <button className={cn(style.addButton, style.glassButton)}>Добавить</button>
            </div>
        </div>
    )
}