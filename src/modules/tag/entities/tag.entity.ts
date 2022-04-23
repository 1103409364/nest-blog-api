import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tag' })
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;
}
