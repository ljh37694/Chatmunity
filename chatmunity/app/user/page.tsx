'use client'

import styles from './page.module.css';
import LogoutButton from '@/components/ui/LogoutButton';
import LoginButton from '@/components/ui/LoginButton';

export default function User() {
  return (
    <div>
      <LogoutButton />
      <LoginButton />
    </div>
  );
}