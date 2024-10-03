'use client'

import styles from '@/styles/ui/UserButton.module.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import TogglePanel from '../layout/TogglePanel';
import { SessionProvider } from 'next-auth/react';

export default function UserBUtton() {
  const [show, setShow] = useState<boolean>(false);

  const userBtnRef = useRef<HTMLLabelElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const clickOut = (e: MouseEvent) =>{
    if (panelRef.current && !panelRef.current.contains(e.target as Node) && 
        userBtnRef.current && !userBtnRef.current.contains(e.target as Node)) {
      setShow(false);
      console.log(show);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOut);

    return () => {
      document.removeEventListener('mousedown', clickOut);
    }
  }, []);

  return (
    <>
      <label ref={userBtnRef}>
        <FontAwesomeIcon icon={faUser} onClick={(e) => { setShow(!show); }} />
      </label>

      <SessionProvider>
        <div ref={panelRef}>
          {show ? <TogglePanel /> : null}
        </div>
      </SessionProvider>
    </>

  )
}