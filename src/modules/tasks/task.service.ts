import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression, Interval, Timeout } from "@nestjs/schedule";

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_5_SECONDS) //每隔5秒执行一次
  handleCron() {
    this.logger.log({ message: "Called every 5 seconds" });
  }

  @Interval(1000 * 10) //每隔10秒执行一次
  handleInterval() {
    this.logger.log("Called every 10 seconds");
  }

  @Timeout(1000 * 5) //每隔5秒只执行一次
  handleTimeout() {
    this.logger.log("Called once after 5 seconds");
  }
}

// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second (optional)
