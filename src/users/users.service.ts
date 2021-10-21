import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/Users';
import bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}
    getUser() {}
    async join(email: string, nickname: string, password: string) {
        if (!email) {
            throw new HttpException('이메일 없음', 400)
        }
        if (!nickname) {
            throw new HttpException('닉네임 없음', 400)
        }
        if (!password) {
            throw new HttpException('비밀번호 없음', 400)
        }
        const user = await this.usersRepository.findOne({ where: { email } })
        if (user) {
            throw new Error('이미 존재하는 사용자입니다')
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await this.usersRepository.save({
            email,
            nickname,
            password: hashedPassword
        });
    }
}
