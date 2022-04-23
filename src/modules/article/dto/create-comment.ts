import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  readonly body: string;
}

export class CreateCommentRO {
  @IsNotEmpty()
  readonly comment: CreateCommentDto;
}
