import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'follows' })
export class FollowsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  followerId: number;

  @Column()
  followingId: number;
}
