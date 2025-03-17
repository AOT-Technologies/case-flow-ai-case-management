import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCaseflowEmployerInput {
  @Field()
  name: string;

  @Field()
  worksafenumber: number;

  @Field()
  phonenumber: number;

  @Field()
  email: string;

  @Field()
  createdate: Date;
}