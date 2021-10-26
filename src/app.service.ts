import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello'
  }
}
