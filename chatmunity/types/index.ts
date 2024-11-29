import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ObjectId } from "mongodb";
import { User } from "next-auth";

export interface Chat {
  _id?: ObjectId | string,
  content: string,
  date: string,
  name: string,
  writer: string,
}

export interface CommentType extends Chat {
  post_id: string,
  root_chat: string | null,
}

export interface Post extends Chat {
  title: string,
  views: number,
  likes: number,
  room_id: string,
  like_users: string[],
}

type UserStatus = 'online' | 'offline' | 'away';

export interface UserData extends User {
  _id: ObjectId | string,
  password?: string,
  created_at: string,
  status: UserStatus,
}

export interface Profile {
  name: string,
  img: string,
}

export interface TopNavMenu {
  url?: string,
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  icon: IconDefinition,
}

export interface Room {
  _id?: ObjectId | string,
  title: string,
  content: string,
  image: string,
}

export interface PostRoomType extends Room {
  id: string,
}

export interface DmRoom {
  _id?: ObjectId | string,
  member: {
    email: string,
    name: string,
  }[],
}

export interface Dm extends Chat {
  room_id: string,
}

export interface Friend {
  _id?: ObjectId | string,
  user_id: string,
  friend_id: string,
}

export interface UserSocketData {
  userId: string,
  socketId: string,
  status: UserStatus,
}
