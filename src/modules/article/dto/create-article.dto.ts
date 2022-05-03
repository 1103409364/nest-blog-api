import { TagEntity } from "@/modules/tag/entities/tag.entity";
import { IsNotEmpty } from "class-validator";

export class CreateArticleDto {
  @IsNotEmpty({ message: "标题不能为空" })
  readonly title: string;
  readonly description: string;
  @IsNotEmpty()
  readonly body: string;
  readonly tags: TagEntity[];
}
export class CreateArticleRO {
  @IsNotEmpty()
  readonly article: CreateArticleDto;
}
