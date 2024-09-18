import styles from './page.module.css';
import LogoutButton from '@/components/ui/LogoutButton';
import LoginButton from '@/components/ui/LoginButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function User() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <div>
      { session ? <LogoutButton /> : <LoginButton /> }
    </div>
  );
}