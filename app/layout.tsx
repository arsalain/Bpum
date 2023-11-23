'use client';

import './globals.css'
import {useEffect} from 'react'
import type { Metadata } from 'next'
import { Varela_Round, Roboto, Oswald,Jost, League_Gothic } from 'next/font/google';
import { metadata } from './metadata'; 
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';


const Jostr = Jost({ weight: '400', subsets: ['latin'] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Importing AOS and initializing inside useEffect
    const AOS = require('aos');
    AOS.init({
      // Optionally, you can define AOS settings here, for example:
      duration: 1000,
      // once: true,
    });
  }, []);
  return (
    
    <html lang="en">
           <Head>
        <title>Backpackers United</title>
        <meta name="description" content="One of the best trek / tour operators in South India" />

      </Head>
      <body className={`${Jostr.className}  `}>
  {children}
</body>
    </html>
  )
}
