'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({ content, footer, children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Header content={content} />}
      <main>{children}</main>
      {!isAdminPage && <Footer footer={footer} />}
    </>
  );
} 