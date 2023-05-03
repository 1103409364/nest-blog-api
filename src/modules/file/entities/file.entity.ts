import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "file" })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: "" })
  fileName: string; // 文件名。默认值不能用 CURRENT_TIMESTAMP

  @Column({ default: "" })
  filePath: string; // 真实路径

  @Column({ default: "" })
  staticPath: string; // 静态路径

  @Column({ default: "" })
  previewPath?: string; // 预览文件真实路径

  @Column({ default: "" })
  previewStaticPath?: string; // 静态预览路径

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
