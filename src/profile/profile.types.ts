import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  @Field() id!: string;
  @Field() name!: string;
  @Field() category!: string;
}

@ObjectType()
export class Experience {
  @Field() id!: string;
  @Field() company!: string;
  @Field() position!: string;
  @Field() period!: string;
  @Field() achievements!: string;
}

@ObjectType()
export class Project {
  @Field() id!: string;
  @Field() name!: string;
  @Field() description!: string;
  @Field() url!: string;
}

@ObjectType()
export class Profile {
  @Field() id!: string;
  @Field() name!: string;
  @Field() description!: string;
  @Field() githubUrl!: string;
  @Field(() => [Skill]) skills!: Skill[];
  @Field(() => [Experience]) experience!: Experience[];
  @Field(() => [Project]) projects!: Project[];
}
