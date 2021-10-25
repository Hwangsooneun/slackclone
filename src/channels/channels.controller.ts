import { Controller, Get, Param, Post, Query, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CHANNEL')
@Controller('api/workspaces/:url/channels')
export class ChannelsController {
    @Get()
    getAllChannels() {

    }

    @Post(':name')
    createChannel() {

    }

    @Get(':name')
    getSpecificChannel(@Param('name') name: string) {
        
    }

    @Get(':name/chats')
    getChats(@Query() query, @Param() param) {
        console.log(query.perPage, query.page)
        console.log(param.id, param.url)
    }

    @Post(':name/chats')
    postChats(@Body() body) {

    }

    @Get(':name/members')
    getAllMembers() {

    }

    @Post(':name/members')
    inviteMembers() {}
}
