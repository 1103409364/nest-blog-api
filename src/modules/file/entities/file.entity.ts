import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "file" })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  filePath: string;

  @Column()
  mimeType: string;

  @Column()
  fileSize: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  uploadTime: Date;

  @Column({ default: "root" })
  userId?: string;

  @Column({ default: "" })
  desc?: string;
}
