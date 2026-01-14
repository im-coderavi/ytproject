import React, { useEffect } from 'react';
import { useState } from 'react';
import SoftBackdrop from './SoftBackdrop';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const location = useLocation()
    const [state, setState] = useState(location.state?.state || 'login');
    const { user, login, signUp } = useAuth();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (state === 'login') {
            login(formData);
        } else {
            signUp(formData);
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);

    return (
        <>
            <SoftBackdrop />
            <div className='min-h-screen flex items-center justify-center'>
                <form onSubmit={handleSubmit} className='w-full sm:w-87.5 text-center bg-white/6 border border-white/10 rounded-2xl px-8 pb-10'>
                    <h1 className='text-white text-3xl mt-10 font-medium'>{state === 'login' ? 'Login' : 'Sign up'}</h1>

                    <p className='text-gray-400 text-sm mt-2'>Please sign in to continue</p>

                    {state !== 'login' && (
                        <div className='flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-pink-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all '>
                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' className='text-white/60' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                {' '}
                                <circle cx='12' cy='8' r='5' /> <path d='M20 21a8 8 0 0 0-16 0' />{' '}
                            </svg>
                            <input type='text' name='name' placeholder='Name' className='w-full bg-transparent text-white placeholder-white/60 border-none outline-none ' value={formData.name} onChange={handleChange} required />
                        </div>
                    )}

                    <div className='flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-pink-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all '>
                        <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' className='text-white/75' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                            {' '}
                            <path d='m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' /> <rect x='2' y='4' width='20' height='16' rx='2' />{' '}
                        </svg>
                        <input type='email' name='email' placeholder='Email id' className='w-full bg-transparent text-white placeholder-white/60 border-none outline-none ' value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className=' flex items-center mt-4 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-pink-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all '>
                        <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' className='text-white/75' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                            {' '}
                            <rect width='18' height='11' x='3' y='11' rx='2' ry='2' /> <path d='M7 11V7a5 5 0 0 1 10 0v4' />{' '}
                        </svg>
                        <input type='password' name='password' placeholder='Password' className='w-full bg-transparent text-white placeholder-white/60 border-none outline-none' value={formData.password} onChange={handleChange} required />
                    </div>

                    <div className='mt-4 text-left'>
                        <button className='text-sm text-pink-400 hover:underline'>Forget password?</button>
                    </div>

                    <button type='submit' className='mt-2 w-full h-11 rounded-full text-white bg-pink-600 hover:bg-pink-500 transition '>
                        {state === 'login' ? 'Login' : 'Sign up'}
                    </button>

                    <p onClick={() => setState((prev: string) => (prev === 'login' ? 'register' : 'login'))} className='text-gray-400 text-sm mt-3 mb-6 cursor-pointer'>
                        {state === 'login' ? "Don't have an account?" : 'Already have an account?'}
                        <span className='text-pink-400 hover:underline ml-1'>click here</span>
                    </p>

                    <div className='mt-2 flex items-center justify-between'>
                        <div className='h-[1px] bg-white/10 w-[45%]'></div>
                        <p className='text-gray-400 text-sm'>or</p>
                        <div className='h-[1px] bg-white/10 w-[45%]'></div>
                    </div>

                    <a
                        href={`${import.meta.env.VITE_BASE_URL}/auth/google`}
                        className='mt-2 w-full h-11 rounded-full text-white bg-white/10 hover:bg-white/20 border border-white/10 transition flex items-center justify-center gap-2 cursor-pointer'
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </a>
                </form>
            </div>
        </>
    );
};

export default Login;
