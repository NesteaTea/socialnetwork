'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
    const { user, authChecked } = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (authChecked && !user) {
            router.replace('/auth');
        }
    }, [authChecked, user, router]);

    if (!authChecked) return <div>Загрузка...</div>;

    return children;
}