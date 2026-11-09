import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile() {
    const profile = await this.prisma.profile.findUnique({
      where: { id: 'kirill' },
      include: {
        skills: { orderBy: { name: 'asc' } },
        experience: { orderBy: { id: 'asc' } },
        projects: { orderBy: { name: 'asc' } },
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile is not initialized');
    }
    return profile;
  }
}
