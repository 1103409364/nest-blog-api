import { UserEntity } from "@/modules/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ArticleEntity } from "./article.entity";

@Entity({ name: "comment" })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 5000 })
  body: string;

  @Column()
  slug: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @ManyToOne((type) => ArticleEntity, (article) => article.comments)
  article: ArticleEntity;

  @ManyToOne((type) => UserEntity)
  author: UserEntity;
}
