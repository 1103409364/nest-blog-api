import { ArticleEntity } from '@/modules/article/entities/article.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'tag' })
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @ManyToOne((type) => ArticleEntity, (article) => article.tags)
  article: ArticleEntity;
}
