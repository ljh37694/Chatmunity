import { ObjectId } from "mongodb";

export interface Chat {
  _id?: ObjectId,
  content: string,
  date?: Date,
}

export interface Post extends Chat {
  title: string,
  chatCount?: number,
  views: number,
  likes: number,
}