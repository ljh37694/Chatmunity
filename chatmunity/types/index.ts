import { ObjectId } from "mongodb";

export interface Post {
  _id?: ObjectId,
  title: string,
  content: string,
}

export interface Chat {
  content: string,
  url?: string,
}