import style from './aside.module.css'
import { cn } from "@/lib/utils";
import Nav from './ui/nav';

export default function Aside() {
    return (
        <aside className={cn(style.sidebar, style.glass)}>
            <div className={style.profileSection}>
                <div className={style.profileHeader}>
                    <img src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' alt='Avatar profile' className={style.avatar}></img>
                    <div className={style.profileInfo}>
                        <div className={style.profileName}>Имя Фамилия</div>
                        <div className={style.profileStatus}>@username</div>
                    </div>
                </div>           
            </div>
            <Nav />
        </aside>
    );
}