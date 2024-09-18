import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ObjectId } from "mongodb";

export interface Chat {
  _id?: ObjectId,
  writer?: string,
  content: string,
  date?: string,
  post_id: string,
}

export interface Post {
  _id?: ObjectId,
  writer?: string,
  content: string,
  date?: string,
  title: string,
  chatCount?: number,
  views: number,
  likes: number,
}

export interface Profile {
  name: string,
  img: string,
}

export interface TopNavMenu {
  url?: string,
  onClick?: (e :React.MouseEvent<HTMLElement, MouseEvent>) => void,
  icon: IconDefinition,
}