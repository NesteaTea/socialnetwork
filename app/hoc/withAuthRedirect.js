"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuthRedirect(Component) {
    return function WrappedComponent(props) {
        const user = useSelector((state) => state.auth.user);
        const authChecked = useSelector((state) => state.auth.authChecked);
        const router = useRouter();

        useEffect(() => {
            if (authChecked && !user) {
                router.push("/auth");
            }
        }, [user, authChecked, router]);

        if (!authChecked) return null;

        return <Component {...props} />;
    };
}
