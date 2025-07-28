import { cn } from "@/lib/utils";
import style from "./post.module.css";

export default function Post() {
    return (
        <div className={cn(style.postCard, style.glass)}>
            <div className={style.postHeader}>
                <div className={style.postAuthor}>
                    <img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80" alt="Анна Смирнова" className={style.postAvatar}></img>
                    <div className={style.postAuthorInfo}>
                        <div className={style.postAuthorName}>Алексей Смирнов</div>
                        <div className={style.postAuthorDate}>@username • 2 часа назад</div>
                    </div>
                </div>
                <button className={cn(style.postMenuButton, style.glassButton)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(style.lucide, style.lucideEllipsis)} aria-hidden="true"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                </button>
            </div>
            <div className={style.postContent}>
                <p className={style.postText}>
                    Завершила работу над новым дизайн-проектом! Очень довольна результатом. Использовала новые техники glassmorphism и градиенты для создания современного интерфейса. Что думаете? 🎨✨
                </p>
                <div className={cn(style.postImageContainer, style.glass)}>
                    <img src="https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&amp;h=600&amp;fit=crop" alt="Post content" className={style.postImage}></img>
                </div>
            </div>
            <div className={style.postActions}>
                <div className={style.postActionsButtons}>
                    <button className={cn(style.postActionButton, style.glassButton, style.likeButton)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                        42
                    </button>
                    <button className={cn(style.postActionButton, style.glassButton, style.commentButton)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
                        8
                    </button>
                    <button className={cn(style.postActionButton, style.glassButton, style.shareButton)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share" aria-hidden="true"><path d="M12 2v13"></path><path d="m16 6-4-4-4 4"></path><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path></svg>
                        3
                    </button>
                </div>
                <button className={cn(style.bookmarkButton, style.glassButton)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark" aria-hidden="true"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
                </button>
            </div>
        </div>
    )
}