"use client"

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setAuthChecked } from '../store/slice/authSlice';

export default function AuthProvider({ children }) {
    const dispatch = useDispatch();
    const { authChecked } = useSelector(state => state.auth);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/profile', {
                    credentials: 'include',
                });

                if (!res.ok) {
                    dispatch(setUser(null));
                    return;
                }

                const data = await res.json();
                dispatch(setUser(data.user));
            } catch (err) {
                dispatch(setUser(null));
            } finally {
                dispatch(setAuthChecked()); // ✅ Всегда ставим true
            }
        };

        if (!authChecked) {
            fetchProfile();
        }
    }, [dispatch, authChecked]);

    if (!authChecked) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <div className="loader" />
            </div>
        );
    }

    return children;
}