import { CommentsEntity } from './comment.type';
import { PostsEntity } from './post.type';
import { ProfileEntity } from './profile.type';
import { UserEntity } from './user.type';

export enum ApiName {
  Users = 'users',
}

export interface DB {
  comments?: CommentsEntity[];
  posts?: PostsEntity[];
  profile: ProfileEntity;
  users?: UserEntity[];
}
