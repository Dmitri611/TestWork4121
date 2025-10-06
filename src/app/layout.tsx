import { cookies } from 'next/headers';

import api from '@/services/api';

import './globals.scss';
import { Footer, Header } from '@/components';
import { User } from '@/types';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  let user: User | null = null;

  if (token) {
    try {
      const res = await api.get<User>('/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      user = res.data;
    } catch (err) {
      console.error('Failed to fetch user', err);
    }
  }

  return (
    <html lang='ru'>
      <body className='app'>
        <Header user={user} />
        <main className='main'>{children}</main>
        <Footer user={user} />
      </body>
    </html>
  );
}
