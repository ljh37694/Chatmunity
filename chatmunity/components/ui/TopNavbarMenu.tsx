'use client'

import { TopNavMenu } from "@/types";
import { faHome, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TogglePanel from "../layout/TogglePanel";
import { Session } from "next-auth";

interface Props {
  session: Session | null,
}

export default function TopNavbarMenu(props: Props) {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);

  const navMenuList: TopNavMenu[] = [
    { url: "/main", icon: faHome }, 
    { url: '/write', icon: faPlus }, 
    { icon: faUser, onClick(e) { setShow(!show); }, }, 
  ];

  return (
    <div>
      {navMenuList.map((item, idx) => {
        return (
          <label key={idx} onClick={
            item.url ? () => { router.push(item.url as string); } : item.onClick
          }>
            <FontAwesomeIcon icon={item.icon} />
          </label>
        );
      })}

      {
        show ? <TogglePanel setShow={setShow} session={props.session} /> : null
      }
    </div>
  );
}