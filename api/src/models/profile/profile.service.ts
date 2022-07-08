import { Injectable, InternalServerErrorException, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private readonly repository: Repository<Profile>
  ) {}

  async create(dto: Profile): Promise<Profile> {
    const profile = await this.repository.create(dto);
    const profileExists = await this.findByEmail(profile.email);
    
    if(profileExists) {
      throw new InternalServerErrorException('Profile already exists!');
    }
    
    return await this.repository.save(profile);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findById(id: string) {
    return await this.repository.findOne({ id });
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({
      email
    });
  }

  async update(id: string, dto: Profile) {
    const profileExists = this.findById(id);
    if (!profileExists) {
      throw new InternalServerErrorException('Profile already exists!');
    }
    
    return await this.repository.update(id, dto);
  }

  async remove(id: string) {
    return await this.repository.delete(id);
  }
}