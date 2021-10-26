import { Controller, Get, Param, Post, Query, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { PostChatDto } from 'src/common/dto/post-chat.dto';
import { ChannelsService } from './channels.service';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { Users } from 'src/entities/Users';

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
    fs.mkdirSync('uploads')
}

@ApiTags('CHANNEL')
@Controller('api/workspaces/:url/channels')
export class ChannelsController {
    constructor(private channelsService: ChannelsService) {}
    @Get()
    getAllChannels(@Param('url') url: string, @User() user) {
        return this.channelsService.getWorkspaceChannels(url, user.id)
    }

    @Post(':name')
    createChannel() {

    }

    @Get(':name')
    getSpecificChannel(@Param('name') name: string) {
        
    }

    @Get(':name/chats')
    getChats(
        @Query() query, 
        @Param('url') url: string,
        @Param('name') name: string,
        @Param() param,
        ) {
        console.log(query.perPage, query.page)
        console.log(param.id, param.url)
        return this.channelsService.getWorkspaceChannelChats(
            url,
            name,
            query.perPage,
            query.page,
        );
    }

    @Post(':name/chats')
    postChats(
        @Param('url') url: string,
        @Param('name') name: string,
        @Body() body: PostChatDto,
        @User() user,
        ) {
        return this.channelsService.createWorkspaceChannelChats(
            url,
            name,
            body.content,
            user.id
        )
    }

    @UseInterceptors(
        FilesInterceptor('image', 10, {
            storage: multer.diskStorage({
                destination(req, file, cb) {
                    cb(null, 'uploads/');
                },
                filename(req, file, cb) {
                    const ext = path.extname(file.originalname);
                    cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
                }
            }),
            limits: { fileSize: 5 * 1024 * 1024 }, 
        })
    )
    @Post(':name/images')
    postImages(
        @UploadedFile() files: Express.Multer.File[],
        @Param('url') url: string,
        @Param('name') name: string,
        @User() user
    ) {
        return this.channelsService.createWorkspaceChannelImages(url, name, files, user.id)
    }

    @Get(':name/unreads')
    postUnreads(
        @Query('after') after: number,
        @Param('url') url: string,
        @Param('name') name: string,
        ) {
        return this.channelsService.getChannelUnreadsCount(url, name, after)
    }

    @Get(':name/members')
    getAllMembers(@Param('url') url: string, @Param('name') name: string) {
        return this.channelsService.getWorkspaceChannelMembers(url, name)
    }

    @Post(':name/members')
    inviteMembers() {}
}
