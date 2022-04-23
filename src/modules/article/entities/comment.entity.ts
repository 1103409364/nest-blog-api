import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity({ name: 'comment' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 5000 })
  body: string;

  @ManyToOne((type) => ArticleEntity, (article) => article.comments)
  article: ArticleEntity;
}
