import Post from "../Post/page";
import style from "./allposts.module.css";

export default function AllPosts() {
    return (
        <div className={style.postsContainer}>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />

        </div>
    )
}