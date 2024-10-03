'use client'

import { TopNavMenu } from "@/types";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import UserBUtton from "./UserButton";
import FriendButton from "./FriendButton";

export default function TopNavbarMenu() {
  const router = useRouter();

  const navMenuList: TopNavMenu[] = [
    { url: "/main", icon: faHome }, 
    { url: '/write', icon: faPlus }, 
  ];

  return (
    <>
      {navMenuList.map((item, idx) => {
        return (
          <label className="user-btn" key={idx} onClick={
            item.url ? () => { router.push(item.url as string); } : item.onClick
          }>
            <FontAwesomeIcon icon={item.icon} />
          </label>
        );
      })}

      <UserBUtton />
      <FriendButton />
    </>
  );
}