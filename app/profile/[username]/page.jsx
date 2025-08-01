"use client"

import { cn } from "@/lib/utils";
import ProtectedRoute from "../../ProtectedRoute";
import Aside from "../../ui/aside/page";
import Header from "../../ui/header/page";
import RightAside from "../../ui/rightAside/page";
import style from './profile.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import Post from "../../ui/posts/Post/page";
import { formatJoinDate } from '../../utils/formatDate';
import useFriendStatus from '../../hooks/useFriendStatus'
import { useParams, useRouter } from "next/navigation";
import withAuthRedirect from '../../hoc/withAuthRedirect'

function Profile() {
    const [isPosts, setIsPosts] = useState('post')
    const { username } = useParams();
    const [profileUser, setProfileUser] = useState(null);
    const authUser = useSelector(state => state.auth.user);
    const [friendStatus, setFriendStatus] = useState(null);
    const router = useRouter();

    const { isFriend, loading, addFriend, removeFriend } = useFriendStatus(authUser?.id);

    const isOwnProfile = authUser?.username === username;

    const handleTabs = () => {
        if (isPosts === 'post') {
            setIsPosts('media')
        } else {
            setIsPosts('post')
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/profile/${username}`);
                const data = await res.json();
                if (res.ok) {
                    setProfileUser(data.user);
                } else {
                    console.error(data.message);
                }
            } catch (err) {
                console.error('Ошибка загрузки пользователя:', err);
            }
        };

        if (username) {
            fetchUser();
        }
    }, [username]);

    useEffect(() => {
        if (authUser && profileUser && authUser.id !== profileUser.id) {
            setFriendStatus({ isFriend, loading, addFriend, removeFriend });
        }
    }, [authUser, profileUser]);


    return (
        <ProtectedRoute>
            <Header />
            <div className={style.mainContainer}>
                <Aside />
                <div className={style.profileMainContent}>
                    <div className={style.profileCover}>
                        <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&amp;h=400&amp;fit=crop" alt="Cover" className={style.profileCoverImage} />
                        <div className={style.profileCoverGradient}></div>
                    </div>
                    <div className={cn(style.profileInfoSection, style.glass)}>
                        <div className={style.profileMainInfo}>
                            <img src={profileUser?.avatar ?? '/user.png'} alt="Profile avatar" className={style.profileAvatarLarge} />
                            <div className={style.profileDetails}>
                                <div className={style.profileHeaderActions}>
                                    <div className={style.profileTitleSection}>
                                        <h1 className={style.profileName}>{profileUser?.name} {profileUser?.surname}</h1>
                                        <p className={style.profileUsername}>@{profileUser?.username}</p>
                                    </div>
                                    <div className={style.profileActions}>
                                        {!isOwnProfile && friendStatus && !friendStatus.loading && (
                                            <>
                                                <button
                                                    className={cn(style.profileActionButton, style.primary)}
                                                    onClick={friendStatus.isFriend ? friendStatus.removeFriend : friendStatus.addFriend}
                                                >
                                                    {friendStatus.isFriend ? 'Удалить' : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-plus" aria-hidden="true">
                                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                                            <circle cx="9" cy="7" r="4"></circle>
                                                            <line x1="19" x2="19" y1="8" y2="14"></line>
                                                            <line x1="22" x2="16" y1="11" y2="11"></line>
                                                        </svg>
                                                    )}
                                                </button>
                                                <button className={cn(style.profileActionButton, style.secondary)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle" aria-hidden="true">
                                                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                                                    </svg>
                                                </button>
                                            </>
                                        )}
                                        <button className={cn(style.profileActionButton, style.secondary)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis" aria-hidden="true">
                                                <circle cx="12" cy="12" r="1"></circle>
                                                <circle cx="19" cy="12" r="1"></circle>
                                                <circle cx="5" cy="12" r="1"></circle>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <p className={style.profileBio}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <ul className={style.profileMeta}>
                                    <li className={style.profileMetaItem}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin profile-meta-icon" aria-hidden="true">
                                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                        <span>Москва, Россия</span>
                                    </li>
                                    <li className={style.profileMetaItem}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link profile-meta-icon" aria-hidden="true">
                                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                        </svg>
                                        <a href="https://example.com" target="_blank" rel="noopener noreferrer" className={style.profileLink}>example.com</a>
                                    </li>
                                    <li className={style.profileMetaItem}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar profile-meta-icon" aria-hidden="true">
                                            <path d="M8 2v4"></path><path d="M16 2v4"></path>
                                            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                            <path d="M3 10h18"></path>
                                        </svg>
                                        <span>{formatJoinDate(profileUser?.created_at)}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <ul className={style.profileLargeStats}>
                            <li className={style.profileLargeStat}>
                                <span className={style.profileLargeStatCount}>120</span>
                                <span className={style.profileLargeStatLabel}>Посты</span>
                            </li>
                            <li className={style.profileLargeStat}>
                                <span className={style.profileLargeStatCount}>427</span>
                                <span className={style.profileLargeStatLabel}>Друзей</span>
                            </li>
                            <li className={style.profileLargeStat}>
                                <span className={style.profileLargeStatCount}>12.3К</span>
                                <span className={style.profileLargeStatLabel}>Подписчиков</span>
                            </li>
                        </ul>
                    </div>
                    <div className={cn(style.profileTabs, style.glass)}>
                        <div className={style.profileTabsHeader}>
                            <button className={isPosts === 'post' ? cn(style.profileTabButton, style.active) : style.profileTabButton} onClick={handleTabs}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid3x3 lucide-grid-3x3 profile-tab-icon" aria-hidden="true">
                                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                                    <path d="M3 9h18"></path>
                                    <path d="M3 15h18"></path>
                                    <path d="M9 3v18"></path>
                                    <path d="M15 3v18"></path>
                                </svg>
                                <span>Посты</span>
                                <span className={style.profileTabCount}>(6)</span>
                            </button>
                            <button className={isPosts === 'media' ? cn(style.profileTabButton, style.active) : style.profileTabButton} onClick={handleTabs}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image profile-tab-icon" aria-hidden="true">
                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                    <circle cx="9" cy="9" r="2"></circle>
                                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                                </svg>
                                <span>Медиа</span>
                                <span className={style.profileTabCount}>(3)</span>
                            </button>
                        </div>
                        {isPosts === 'post' ? (
                            <div className={style.profileTabContent}>
                                <ul className={style.profilePostsList}>
                                    <Post />
                                </ul>
                            </div>
                        ) : (
                            <div className={style.profileTabContent}>
                                <div className={style.profilePostsGrid}>
                                    <div className={style.profilePostThumbnail}>
                                        <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&amp;h=600&amp;fit=crop" alt="Post media" />
                                        <div className={style.profilePostOverlay}>
                                            <div className={style.profilePostStats}>
                                                <div className={style.profilePostStat}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                                                    <span>189</span>
                                                </div>
                                                <div className={style.profilePostStat}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
                                                    <span>34</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <RightAside />
            </div>
        </ProtectedRoute>
    );
}

export default withAuthRedirect(Profile);