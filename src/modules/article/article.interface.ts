import { UserEntity } from '@/modules/user/entities/user.entity';
import { ArticleEntity } from './entities/article.entity';
import { CommentEntity } from './entities/comment.entity';
export interface CommentData extends CommentEntity {
  author: UserEntity;
}

export interface ArticleData extends ArticleEntity {
  // slug: string;
  // title: string;
  // description: string;
  // body?: string;
  // tagList?: string[];
  // createdAt?: Date;
  // updatedAt?: Date;
  favorite?: boolean;
  // favoritesCount?: number;
  // author?: UserData;
}

export interface CommentsRO {
  comments: CommentData[];
}

export interface ArticleRO {
  article: ArticleEntity;
}

export interface ArticlesRO {
  articles: ArticleEntity[];
  articlesCount: number;
}
