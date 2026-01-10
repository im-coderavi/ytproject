'use client';
import SectionTitle from '../components/SectionTitle';
import { ArrowRightIcon, MailIcon, UserIcon } from 'lucide-react';
import { motion } from 'motion/react';

const WhatsappIcon = () => {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='20' height='20' viewBox='0 0 48 48'>
            <path fill='#40c351' d='M41.9,8.2C37.4,3.8,31,1.5,24.1,1.5c-13.1,0-23.7,10.6-23.7,23.7c0,4.2,1.1,8.3,3.2,11.8 l-3.4,12.4l12.7-3.3c3.4,1.9,7.3,3,11.3,3h0c0,0,0,0,0,0c13.1,0,23.7-10.6,23.7-23.7C47.9,15.6,45.6,11.8,41.9,8.2z'></path>
            <path
                fill='#fff'
                d='M32.853,30.932c-0.273-0.137-1.618-0.796-1.87-0.886c-0.252-0.09-0.436-0.137-0.619,0.137 c-0.184,0.273-0.708,0.886-0.869,1.069c-0.161,0.184-0.322,0.205-0.595,0.068c-0.273-0.137-1.159-0.425-2.206-1.362 c-0.817-0.732-1.362-1.636-1.523-1.909c-0.161-0.273,0.161-0.252,0.161-0.252c0.151-0.161,0.342-0.425,0.513-0.639 c0.161-0.184,0.213-0.322,0.322-0.547c0.11-0.226,0.054-0.41-0.027-0.547c-0.081-0.137-0.619-1.488-0.844-2.026 c-0.226-0.537-0.452-0.463-0.619-0.473c-0.161-0.011-0.346-0.011-0.529-0.011c-0.184,0-0.479,0.068-0.732,0.346 c-0.252,0.273-0.98,0.954-0.98,2.32c0,1.362,1.006,2.694,1.143,2.878c0.137,0.184,1.984,3.033,4.813,4.249 c0.675,0.294,1.213,0.463,1.636,0.595c0.686,0.205,1.31,0.184,1.804,0.113c0.547-0.081,1.618-0.665,1.843-1.297 c0.226-0.631,0.226-1.169,0.161-1.297C33.299,31.068,33.126,30.999,32.853,30.932z'
            ></path>
        </svg>
    );
};

export default function ContactSection() {
    return (
        <div className='px-4 md:px-16 lg:px-24 xl:px-32'>
            <SectionTitle text1='Contact' text2='Grow your channel' text3="Have questions about our AI? Ready to scale your views? Let's talk." />

            <form onSubmit={(e) => e.preventDefault()} className='grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto text-slate-300 mt-16 w-full'>
                <motion.div initial={{ y: 150, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 320, damping: 70, mass: 1 }}>
                    <p className='mb-2 font-medium'>Your name</p>
                    <div className='flex items-center pl-3 rounded-lg border border-slate-700 focus-within:border-pink-500'>
                        <UserIcon className='size-5' />
                        <input name='name' type='text' placeholder='Enter your name' className='w-full p-3 outline-none' />
                    </div>
                </motion.div>

                <motion.div initial={{ y: 150, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 280, damping: 70, mass: 1 }}>
                    <p className='mb-2 font-medium'>Email id</p>
                    <div className='flex items-center pl-3 rounded-lg border border-slate-700 focus-within:border-pink-500'>
                        <MailIcon className='size-5' />
                        <input name='email' type='email' placeholder='Enter your email' className='w-full p-3 outline-none' />
                    </div>
                </motion.div>

                <motion.div className='sm:col-span-2' initial={{ y: 150, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 240, damping: 70, mass: 1 }}>
                    <p className='mb-2 font-medium'>Message</p>
                    <textarea name='message' rows={8} placeholder='Enter your message' className='focus:border-pink-500 resize-none w-full p-3 outline-none rounded-lg border border-slate-700' />
                </motion.div>

                <motion.button type='submit' className='w-max flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-10 py-3 rounded-full' initial={{ y: 150, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 280, damping: 70, mass: 1 }}>
                    Submit
                    <ArrowRightIcon className='size-5' />
                </motion.button>
            </form>

            <motion.div initial={{ y: 150, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 280, damping: 70, mass: 1 }} className='flex items-center justify-center mt-8'>
                <a href='https://wa.me/919932336746' target='_blank' rel='noreferrer' className='w-max flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-10 py-3 rounded-full'>
                    <WhatsappIcon />
                    Contact on Whatsapp
                </a>
            </motion.div>
        </div>
    );
}