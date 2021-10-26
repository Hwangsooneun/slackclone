import { Controller, Get, Param, Post, Query, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { PostChatDto } from 'src/common/dto/post-chat.dto';
import { ChannelsService } from './channels.service';

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
        return this.channelsService.postChat({ url, content: body.content, name, myId: user.id })
    }

    @Post(':name/images')
    postImages(@Body() body) {
        // return this.channelsService.
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
