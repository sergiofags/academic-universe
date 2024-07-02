"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      router.push('/home'); // Verifique se a rota está correta e existe
    }
  }, [router]);

  return null; // Como não há conteúdo a ser renderizado, podemos retornar `null`.
};

export default HomePage;
