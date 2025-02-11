import {
  PipeTransform,
  ArgumentMetadata,
  // BadRequestException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
/**
 * 自定义全局验证管道
 */
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    // if (!value) {
    //   throw new BadRequestException('No data submitted');
    // }

    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    // 请求参数校验
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(
        {
          message: "Input data validation failed",
          errors: this.buildError(errors),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private buildError(errors) {
    const result = {};
    errors.forEach((el) => {
      const prop = el.property;
      Object.entries(el.constraints).forEach((constraint) => {
        result[prop + constraint[0]] = `${constraint[1]}`;
      });
    });
    return result;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
