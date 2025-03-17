import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateCaseflowLocationsInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  city: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  employerId: number;
}