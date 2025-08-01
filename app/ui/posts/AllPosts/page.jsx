import Post from "../Post/page";
import style from "./allposts.module.css";

export default function AllPosts({ posts }) {
    if (!posts?.length) return <div className={style.notPosts}>Постов пока нет :(</div>

    return (
        <div className={style.postsContainer}>
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    )
}