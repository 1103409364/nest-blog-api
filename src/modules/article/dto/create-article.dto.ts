import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  readonly title: string;
  readonly description: string;
  @IsNotEmpty()
  readonly body: string;
  readonly tagList: string[];
}
export class CreateArticleRO {
  @IsNotEmpty()
  readonly article: CreateArticleDto;
}
