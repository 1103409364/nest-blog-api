import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "file" })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  filePath: string; // 真实路径

  @Column()
  staticPath: string; // 静态路径

  @Column()
  previewPath: string; // 预览文件真实路径

  @Column()
  previewStaticPath: string; // 静态预览路径

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
