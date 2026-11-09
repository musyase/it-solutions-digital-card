import { Query, Resolver } from '@nestjs/graphql';
import { Profile } from './profile.types';
import { ProfileService } from './profile.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profiles: ProfileService) {}

  @Query(() => Profile)
  profile(): Promise<Profile> {
    return this.profiles.getProfile();
  }
}
