import style from './header.module.css';
import { cn } from "@/lib/utils"

export default function Header() {
    return (
        <header className={cn(style.header, style.glassStrong)}>
            <div className={style.headerContent}>
                <div className={style.logo}>
                    <div className={style.logoIcon}>SN</div>
                    <div className={style.logoText}>Social Network</div>
                </div>
                <div className={style.searchBar}>
                    <div className={style.searchWrapper}>
                        <img src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-5.png" alt="Search" className={style.searchIcon} />
                        <input type='text' placeholder='Поиск по социальной сети...' className={style.searchInput}></input>
                    </div>
                </div>
                <div className={style.navIcons}>
                    <button className={cn(style.navButton, style.glassButton)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(style.lucide, style.lucideBell)} aria-hidden="true"><path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path></svg>
                    </button>
                    <button className={cn(style.navButton, style.glassButton)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(style.lucide, style.lucideMessageCircle)} aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
                    </button>
                    <button className={cn(style.navButton, style.glassButton)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(style.lucide, style.lucideHeart)} aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                    </button>
                    <button className={cn(style.navButton, style.glassButton)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(style.lucide, style.lucideUser)} aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </button>
                </div>
            </div>
        </header>
    );
}