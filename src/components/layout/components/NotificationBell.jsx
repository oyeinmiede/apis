import {useEffect,useMemo,useState} from "react";

import{Bell}from "lucide-react";

import{
Popover,
PopoverTrigger,
PopoverContent,
}from "@/components/ui/popover";

import useAuthStore from "@/app/store/authStore";

import{
getNotifications,
markNotificationRead,
}from "../services/notifications";

import "./notification-bell.css";

function NotificationBell(){

    const user=useAuthStore(s=>s.user);

    const[notifications,setNotifications]=useState([]);

    async function loadNotifications(){

        if(!user)return;

        const{data,error}=await getNotifications(user.id);

        if(!error){
            setNotifications(data??[]);
        }

    }

    async function openNotification(notification){

        if(!notification.read){

            await markNotificationRead(notification.id);

            setNotifications(state=>
                state.map(item=>
                    item.id===notification.id
                        ?{
                            ...item,
                            read:true,
                        }
                        :item
                )
            );

        }

    }

    const unread=notifications.filter(n=>!n.read);

    const read=notifications
        .filter(n=>n.read)
        .slice(0,5);

    const unreadCount=useMemo(
        ()=>unread.length,
        [unread]
    );

    useEffect(()=>{
        loadNotifications();
    },[]);

    return(

        <Popover>

            <PopoverTrigger asChild>

                <button className="topbar-icon">

                    <Bell size={18}/>

                    {unreadCount>0&&(
                        <span className="notification-badge">
                            {unreadCount}
                        </span>
                    )}

                </button>

            </PopoverTrigger>

            <PopoverContent
                align="end"
                className="notification-popover"
            >

                <h3>
                    Notifications
                </h3>

                {!!unread.length&&(
                    <>
                        <span className="notification-group-title">
                            Unread
                        </span>

                        {unread.map(notification=>(

                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                unread
                                onClick={openNotification}
                            />

                        ))}
                    </>
                )}

                {!!read.length&&(
                    <>
                        <span className="notification-group-title">
                            Earlier
                        </span>

                        {read.map(notification=>(

                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onClick={openNotification}
                            />

                        ))}
                    </>
                )}

                {!notifications.length&&(

                    <div className="notification-empty">

                        You're all caught up 🎉

                    </div>

                )}

            </PopoverContent>

        </Popover>

    );

}

function NotificationItem({
    notification,
    unread,
    onClick,
}){

    const actor=notification.profiles;

    return(

        <button
            className={`notification-item ${unread?"unread":""}`}
            onClick={()=>onClick(notification)}
        >

            {actor?.avatar_url?(
                <img
                    src={actor.avatar_url}
                    className="notification-avatar"
                />
            ):(
                <div className="notification-avatar initials">
                    {(actor?.full_name||actor?.username||"?")[0]}
                </div>
            )}

            <div className="notification-content">

                <strong>
                    {notification.title}
                </strong>

                <p>
                    {notification.body}
                </p>

                <span>
                    {new Date(notification.created_at).toLocaleString()}
                </span>

            </div>

        </button>

    );

}

export default NotificationBell;