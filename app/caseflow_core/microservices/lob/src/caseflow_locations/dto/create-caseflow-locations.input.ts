import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateCaseflowLocationsInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  city: string;

  @Field()
  @IsDate()
  @IsNotEmpty()
  createdate?: Date;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  employerId: number;
}