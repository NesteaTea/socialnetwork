"use client";

import { cn } from '@/lib/utils';
import style from './auth.module.css';
import Link from 'next/link';
import { useState } from 'react';

const features = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users" aria-hidden="true">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <circle cx="9" cy="7" r="4"></circle>
            </svg>
        ),
        title: "Общайтесь с друзьями",
        description: "Находите единомышленников и делитесь интересными моментами"
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle" aria-hidden="true">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
            </svg>
        ),
        title: 'Обменивайтесь сообщениями',
        description: 'Отправляйте личные сообщения и общайтесь в группах'
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield" aria-hidden="true">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            </svg>
        ),
        title: 'Безопасность данных',
        description: 'Ваша конфиденциальность защищена современными технологиями'
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap" aria-hidden="true">
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
            </svg>
        ),
        title: 'Быстро и удобно',
        description: 'Интуитивный интерфейс и молниеносная загрузка страниц'
    }
];

const loginFormInput = [
    {
        type: 'email',
        name: 'Email',
        for: 'email',
        placeholder: 'Введите ваш email',
        required: true
    },
    {
        type: 'password',
        name: 'Пароль',
        for: 'password',
        placeholder: 'Введите ваш пароль',
        required: true
    }
];

const registerFromInput = [
    {
        type: 'text',
        name: 'Имя',
        for: 'name',
        placeholder: 'Введите ваше имя',
        required: true
    },
    {
        type: 'text',
        name: 'Фамилия',
        for: 'surname',
        placeholder: 'Введите вашу фамилию',
        required: true
    },
    {
        type: 'text',
        name: 'Username',
        for: 'username',
        placeholder: 'Введите имя пользователя',
        required: true
    },
    {
        type: 'email',
        name: 'Email',
        for: 'email',
        placeholder: 'Введите ваш email',
        required: true
    },
    {
        type: 'password',
        name: 'Пароль',
        for: 'password',
        placeholder: 'Введите ваш пароль',
        required: true
    },
    {
        type: 'password',
        name: 'Подтверждение пароля',
        for: 'confirmPassword',
        placeholder: 'Подтвердите пароль',
        required: true
    }
]

export default function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});
    const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

    const formInputs = isRegister ? registerFromInput : loginFormInput;

    const handleTabClick = (register: boolean) => {
        setIsRegister(register);
        setFormValues({});
        setShowPassword({});
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleShowPassword = (field: string) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <div className={style.authPage}>
            <div className={style.authPageLeft}>
                <div className={style.authBranding}>
                    <div className={style.authLogo}>SN</div>
                    <h1 className={style.authTitle}>Social Network</h1>
                    <p className={style.authSubtitle}>Современная социальная сеть для общения, обмена идеями и создания сообществ</p>
                    <ul className={style.authFeatures}>
                        {features.map((feature, index) => (
                            <li key={index} className={style.authFeature}>
                                <div className={style.authFeatureIcon}>
                                    {feature.icon}
                                </div>
                                <div className={style.authFeatureContent}>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={style.authPageRight}>
                <div className={style.authFormContainer}>
                    <div className={style.authFormHeader}>
                        <div className={style.authFormTitle}>
                            {isRegister ? 'Создайте аккаунт' : 'Добро пожаловать!'}
                        </div>
                        <div className={style.authFormSubtitle}>
                            {isRegister ? 'Заполните форму для регистрации' : 'Войдите в свой аккаунт, чтобы продолжить'}
                        </div>
                    </div>
                    <div className={style.authTabs}>
                        <button className={!isRegister ? cn(style.authTab, style.active) : style.authTab} onClick={() => setIsRegister(false)}>Войти</button>
                        <button className={isRegister ? cn(style.authTab, style.active) : style.authTab} onClick={() => setIsRegister(true)}>Регистрация</button>
                    </div>
                    <form className={style.authForm}>
                        {formInputs.map((input, index) => (
                            <div key={index} className={style.authFormGroup}>
                                <label className={style.authFormLabel} htmlFor={input.for}>{input.name}</label>
                                <div className={style.authFormInputWrapper}>
                                    <input
                                        id={input.for}
                                        type={isRegister && input.type === 'password' && showPassword[input.for] ? 'text' : input.type}
                                        name={input.for}
                                        value={formValues[input.for] || ''}
                                        onChange={handleInputChange}
                                        placeholder={input.placeholder}
                                        required={input.required}
                                        className={style.authFormInput}
                                    />
                                    {isRegister && input.type === 'password' && (
                                        <button
                                            type="button"
                                            className={style.authPasswordToggle}
                                            onClick={() => handleShowPassword(input.for)}
                                            tabIndex={-1}
                                        >
                                            {showPassword[input.for] ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off" aria-hidden="true">
                                                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path>
                                                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"></path>
                                                    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"></path>
                                                    <path d="m2 2 20 20"></path>
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye" aria-hidden="true">
                                                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {!isRegister ? (
                            <div className={style.authOptions}>
                                <div className={style.authRemember}>
                                    <input type="checkbox" id="remember" className={style.authCheckbox} />
                                    <label htmlFor="remember" className={style.authCheckboxLabel}>Запомнить меня</label>
                                </div>
                                <Link href="/forgot-password" className={style.authForgotLink}>
                                    Забыли пароль?
                                </Link>
                            </div>
                        ) : (
                            <div className={style.authRemember}>
                                <input type="checkbox" id="terms" className={style.authCheckbox} required />
                                <label htmlFor="terms" className={style.authCheckboxLabel}>
                                    Я соглашаюсь с <Link href="/terms" className={style.authForgotLink}>условиями использования</Link> и <Link href="/terms" className={style.authForgotLink}>политикой конфиденциальности</Link>
                                </label>
                            </div>
                        )}
                        <button type="submit" className={style.authSubmitButton}>
                            {isRegister ? 'Создать аккаунт' : 'Войти'}
                        </button>
                    </form>
                    <div className={style.authFooter}>
                        {isRegister ? <p className={style.authFooterText}>Уже есть аккаунт? <button className={style.authRegisterLink} onClick={() => setIsRegister(false)}>Войти</button></p> : <p className={style.authFooterText}>Нет аккаунта? <button className={style.authRegisterLink} onClick={() => setIsRegister(true)}>Зарегистрируйтесь</button></p>}
                    </div>
                </div>
            </div>
        </div>
    )
}