"use client";

import Link from 'next/link';
import style from './header.module.css';
import { cn } from "@/lib/utils"
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '../../store/slice/authSlice';

export default function Header() {
    const dispatch = useDispatch();
    const router = useRouter();
    const authUser = useSelector(state => state.auth.user);

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:4000/api/logout', {
                method: 'POST',
                credentials: 'include',
            });

            dispatch(logout());
            router.push('/auth');
        } catch (err) {
            console.error('Ошибка выхода:', err);
        }
    };

    const handleRedirect = (path) => {
        router.push(path)
    }

    if (!authUser) return <div className={style.loading}>Загрузка...</div>;

    const buttons = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(style.lucide, style.lucideBell)} aria-hidden="true"><path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path></svg>,
            path: '/push'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(style.lucide, style.lucideMessageCircle)} aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>,
            path: '/messages'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(style.lucide, style.lucideHeart)} aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>,
            path: '/favorite'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(style.lucide, style.lucideUser)} aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
            path: `/profile/${authUser.username}`
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-log-out">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
            </svg>,
            onClick: handleLogout
        }
    ]

    return (
        <header className={cn(style.header, style.glassStrong)}>
            <div className={style.headerContent}>
                <Link href={'/'} className={style.logo}>
                    <div className={style.logoIcon}>SN</div>
                    <div className={style.logoText}>Social Network</div>
                </Link>
                <div className={style.searchBar}>
                    <div className={style.searchWrapper}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256" className={style.searchIcon}>
                            <g fill="#d9d9d9" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(5.12,5.12)"><path d="M21,3c-9.4,0 -17,7.6 -17,17c0,9.4 7.6,17 17,17c3.35455,0 6.47104,-0.98016 9.10352,-2.65234l12.27539,12.27344l4.24219,-4.24219l-12.09766,-12.09961c2.17229,-2.8553 3.47656,-6.40865 3.47656,-10.2793c0,-9.4 -7.6,-17 -17,-17zM21,7c7.2,0 13,5.8 13,13c0,7.2 -5.8,13 -13,13c-7.2,0 -13,-5.8 -13,-13c0,-7.2 5.8,-13 13,-13z"></path></g></g>
                        </svg>
                        <input type='text' placeholder='Поиск по социальной сети...' className={style.searchInput}></input>
                    </div>
                </div>
                <div className={style.navIcons}>
                    {buttons.map((button, index) => button.path ? (
                        <Link key={index} href={button.path} className={cn(style.navButton, style.glassButton)}>
                            {button.icon}
                        </Link>
                    ) : (
                        <button key={index} className={cn(style.navButton, style.glassButton)} onClick={button.onClick}>
                            {button.icon}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
}