"use client";

import style from './aside.module.css'
import { cn } from "@/lib/utils";
import Nav from './ui/nav';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function Aside() {
    const authUser = useSelector(state => state.auth.user);

    return (
        <>   
            { authUser && (
                <aside className={cn(style.sidebar, style.glass)}>
                    <div className={style.profileSection}>
                        <Link className={style.profileHeader} href={'/profile'}>
                            <img src={authUser?.avatar ?? '/user.png'} alt='Avatar profile' className={style.avatar}></img>
                            <div className={style.profileInfo}>
                                <div className={style.profileName}>{authUser?.name} {authUser?.surname}</div>
                                <div className={style.profileStatus}>@{authUser?.username}</div>
                            </div>
                        </Link>
                    </div>
                    <Nav />
                </aside>
            )}
        </>       
    );
}