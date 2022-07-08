import { Controller, Get, Post, Put, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ok' })
  findById(@Param('id') id: string) {
    return this.profileService.findById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Ok' })
  async create(@Body() dto: Profile): Promise<Profile> {
    const { name, email, password } = dto;
    const profile = new Profile;
    profile.name = name;
    profile.email = email;
    profile.password = password;
    await profile.hashPassword();
    return await this.profileService.create(profile);
  }

  @Put(':id')
  @ApiResponse({ status: 201, description: 'Ok' })
  async update(@Param('id') id: string, @Body() dto: Profile) {
    const { name, email, password } = dto;

    const profile = new Profile;
    profile.name = name;
    profile.email = email;
    profile.password = password;
    await profile.hashPassword();

    return this.profileService.update(id, profile);
  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: 'Ok' })
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}