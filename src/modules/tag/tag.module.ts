import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { TagService } from "./tag.service";
import { TagEntity } from "./entities/tag.entity";
import { TagController } from "./tag.controller";

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity]), UserModule],
  providers: [TagService],
  controllers: [TagController],
  exports: [],
})
export class TagModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public configure(consumer: MiddlewareConsumer) {}
}
