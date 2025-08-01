'use client';

import { useEffect, useState } from 'react';

export default function useFriendStatus(userId) {
    const [isFriend, setIsFriend] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchStatus = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/friends/${username}/status`, {
                credentials: 'include',
            });
            const data = await res.json();
            setIsFriend(data.isFriend);
        } catch {
            setIsFriend(false);
        } finally {
            setLoading(false);
        }
    };

    const addFriend = async () => {
        await fetch(`http://localhost:4000/api/friends/${username}`, {
            method: 'POST',
            credentials: 'include',
        });
        fetchStatus();
    };

    const removeFriend = async () => {
        await fetch(`http://localhost:4000/api/friends/${username}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        fetchStatus();
    };

    useEffect(() => {
        fetchStatus();
    }, [userId]);

    return { isFriend, loading, addFriend, removeFriend };
}
