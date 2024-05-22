import { CommentsEntity } from "./comment.type";
import { PostsEntity } from "./post.type";
import { ProfileEntity } from "./profile.type";
import { UserEntity } from "./user.type";

export enum ApiName {
  Posts = "posts",
  Comments = "comments",
  Profile = "profile",
  Users = "users",
}

export type DB = {
  [ApiName.Comments]: CommentsEntity[];
  [ApiName.Posts]: PostsEntity[];
  [ApiName.Profile]: ProfileEntity;
  [ApiName.Users]: UserEntity[];
};
