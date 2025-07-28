import SidebarSection from "../ui/sidebarSection/page";
import Friend from "./friend/page";
import style from './onlineFriends.module.css'

export default function OnlineFriends() {
    return (
        <SidebarSection title="Онлайн друзья">
            <div className={style.onlineFriendsList}>
                <Friend />
                <Friend />
            </div>
        </SidebarSection>
    )
}