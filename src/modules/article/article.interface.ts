import { UserData } from '../user/user.interface';
import { ArticleEntity } from './entities/article.entity';
interface Comment {
  body: string;
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
  comments: Comment[];
}

export interface ArticleRO {
  article: ArticleEntity;
}

export interface ArticlesRO {
  articles: ArticleEntity[];
  articlesCount: number;
}
