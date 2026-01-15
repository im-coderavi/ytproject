import { MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { isLoggedIn, user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <motion.nav
                className='fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur'
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 250, damping: 70, mass: 1 }}
            >
                <Link to='/'>
                    <img src='/logo.svg' alt='logo' className='h-8.5 w-auto' />
                </Link>

                <div className='hidden md:flex items-center gap-8 transition duration-500'>
                    <Link to='/' className='hover:text-pink-300 transition'>
                        Home
                    </Link>
                    <Link to='/generate' className='hover:text-pink-300 transition'>
                        Generate
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <Link to='/my-generation' className='hover:text-pink-300 transition'>
                                My Generations
                            </Link>
                            <Link to='/pricing' className='hover:text-pink-300 transition'>
                                Pricing
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to='/pricing' className='hover:text-pink-300 transition'>
                                Pricing
                            </Link>
                            <Link to='#' className='hover:text-pink-300 transition'>
                                About
                            </Link>
                        </>
                    )}

                    <Link to='#' className='hover:text-pink-300 transition'>
                        Contact us
                    </Link>
                </div>
                <div className='flex items-center gap-2'>
                    {isLoggedIn ? (
                        <div className='relative group'>
                            <button
                                onClick={() => navigate('/profile')}
                                className='rounded-full size-8 bg-white/20 border-2 border-white/10 md:cursor-default'
                            >
                                {user?.name.charAt(0).toUpperCase()}
                            </button>
                            <div className='absolute hidden md:group-hover:block top-6 right-0 pt-4 w-64'>
                                <div className='bg-zinc-900 border-2 border-white/10 p-4 rounded-xl shadow-lg flex flex-col gap-3'>
                                    <div className='flex items-center gap-3 pb-3 border-b border-white/10'>
                                        <div className='rounded-full size-10 bg-pink-600 flex items-center justify-center text-lg font-bold'>
                                            {user?.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className='font-medium truncate'>{user?.name}</p>
                                            <p className='text-xs text-gray-400 truncate'>{user?.email}</p>
                                        </div>
                                    </div>

                                    <div className='bg-white/5 p-3 rounded-lg'>
                                        <div className='flex justify-between items-center mb-2'>
                                            <span className='text-xs text-gray-400'>Current Plan</span>
                                            <span className='text-xs font-bold text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded-full'>
                                                {user?.subscriptionTier || 'Free'}
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center mb-1'>
                                            <span className='text-xs text-gray-400'>Generations</span>
                                            <span className='text-xs font-medium'>
                                                {user?.thumbnailCount || 0} / {user?.subscriptionTier === 'Premium' ? 100 : user?.subscriptionTier === 'Premium Pro' ? '∞' : 5}
                                            </span>
                                        </div>
                                        <div className='w-full bg-white/10 h-1.5 rounded-full overflow-hidden'>
                                            <div
                                                className='bg-pink-500 h-full rounded-full transition-all'
                                                style={{
                                                    width: `${Math.min(((user?.thumbnailCount || 0) / (user?.subscriptionTier === 'Premium' ? 100 : 5)) * 100, 100)}%`
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <Link to='/profile' className='block w-full text-center bg-white/10 hover:bg-white/20 px-5 py-2 rounded-lg text-sm transition mb-2'>
                                        Profile
                                    </Link>
                                    <button onClick={() => logout()} className='w-full bg-white/10 hover:bg-white/20 px-5 py-2 rounded-lg text-sm transition'>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => navigate('/login')} className='hidden md:block px-6 py-2.5 bg-pink-600 hover:bg-pink-700 active:scale-95 transition-all rounded-full'>
                            Get Started
                        </button>
                    )}
                    <button onClick={() => setIsOpen(true)} className='md:hidden'>
                        <MenuIcon size={26} className='active:scale-90 transition' />
                    </button>
                </div>
            </motion.nav>

            <div className={`fixed inset-0 z-100 bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Link onClick={() => setIsOpen(false)} to='/'>
                    Home
                </Link>
                <Link onClick={() => setIsOpen(false)} to='/generate'>
                    Generate
                </Link>
                {isLoggedIn ? (
                    <>
                        <Link onClick={() => setIsOpen(false)} to='/my-generation'>
                            My Generations
                        </Link>
                        <Link onClick={() => setIsOpen(false)} to='/pricing'>
                            Pricing
                        </Link>
                        <Link onClick={() => setIsOpen(false)} to='/profile'>
                            Profile
                        </Link>
                    </>
                ) : (
                    <>
                        <Link onClick={() => setIsOpen(false)} to='/pricing'>
                            Pricing
                        </Link>
                        <Link onClick={() => setIsOpen(false)} to='#'>
                            About
                        </Link>
                    </>
                )}

                <Link onClick={() => setIsOpen(false)} to='#'>
                    Contact us
                </Link>
                {isLoggedIn ? (
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            logout();
                        }}
                    >
                        Logout
                    </button>
                ) : (
                    <Link onClick={() => setIsOpen(false)} to='/login'>
                        Login
                    </Link>
                )}

                <button onClick={() => setIsOpen(false)} className='active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-pink-600 hover:bg-pink-700 transition text-white rounded-md flex'>
                    <XIcon />
                </button>
            </div>
        </>
    );
}
