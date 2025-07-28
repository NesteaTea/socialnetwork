import style from './createPost.module.css';
import { cn } from "@/lib/utils";

export default function CreatePost() {
    return (
        <div className={style.postsContainer}>
            <div className={cn(style.createPost, style.glass)}>
                <div className={style.createPostContent}>
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&amp;h=150&amp;fit=crop&amp;crop=face" alt="Profile" className={style.avatar}></img>
                    <div className={style.createPostForm}>
                        <textarea placeholder="Что у вас нового?" className={cn(style.createPostTextarea, style.glass)}></textarea>
                        <div className={style.createPostActions}>
                            <div className={style.createPostIcons}>
                                <button className={cn(style.actionButton, style.glassButton)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(style.lucide, style.lucideImage)} aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                                </button>
                                <button className={cn(style.actionButton, style.glassButton)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(style.lucide, style.lucideVideo)} aria-hidden="true"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>
                                </button>
                                <button className={cn(style.actionButton, style.glassButton)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(style.lucide, style.lucideSmile)} aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" x2="9.01" y1="9" y2="9"></line><line x1="15" x2="15.01" y1="9" y2="9"></line></svg>
                                </button>
                            </div>
                            <button className={cn(style.publishButton, style.glassButton)}>Опубликовать</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.postsList}></div>
        </div>
    );
}