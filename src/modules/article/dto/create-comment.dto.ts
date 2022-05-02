import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  readonly body: string;
}

export class CreateCommentRO {
  readonly comment: CreateCommentDto;
}
