import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCaseflowEmployerInput {
  @Field()
  name: string;

  @Field()
  worksafenumber: number;

  @Field()
  phonenumber: number;

  @Field()
  email: string;
}