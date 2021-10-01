import { ApiProperty } from "@nestjs/swagger";

export class JoinRequestDto {
    @ApiProperty({
        example: 'catalyst8849@gmail.com',
        description: '이메일',
        required: true,
    })
    public email: string;

    @ApiProperty({
        example: '황돼랑',
        description: '닉네임',
        required: true,
    })
    public nickname: string;

    @ApiProperty({
        example: 'secret',
        description: '비밀번호',
        required: true,
    })
    public password: string;
}