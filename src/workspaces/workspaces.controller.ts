import { Controller, Delete, Get, Post } from '@nestjs/common';
import { get } from 'http';

@Controller('api/workspaces')
export class WorkspacesController {
    @Get()
    getMyWorkspaces() {

    }

    @Post()
    createWorkspace() {

    }

    @Get(':url/members')
    getAllMembersFromWorkspace() {

    }

    @Post(':url/members')
    inviteMembersToWorkspace() {

    }

    @Delete(':url/members/:id')
    kickMemberFromWorkspace() {

    }

    @Get(':url/members/:id')
    getMemberInfoInWorkspace() {

    }

    
}
