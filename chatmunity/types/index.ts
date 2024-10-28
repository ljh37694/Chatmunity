import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ObjectId } from "mongodb";

export interface Chat {
  _id?: ObjectId | string,
  email: string,
  content: string,
  date: string,
  post_id: string,
  name: string,
  writer: string,
  root_chat: string | null,
}

export interface Post {
  _id?: ObjectId | string,
  writer: string,
  content: string,
  date: string,
  title: string,
  views: number,
  likes: number,
  room_id: string,
}

export interface UserData {
  name: string,
  email: string,
  image: string,
  createdAt: string,
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
  img: string,
  id?: string,
}

export interface DmRoom {
  _id?: ObjectId | string,
  member: string[],
}