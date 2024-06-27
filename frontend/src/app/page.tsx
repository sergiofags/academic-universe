"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      router.push('/home');
    }
  });

  return (
    <div>
      <h1>oi</h1>
    </div>
  );
};

export default HomePage;
