import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateCaseflowContactsInput {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  firstname?: String;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  lastname?: String;

  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty()
  phonenumber?: number;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  email?: String;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  dateofbirth?: Date | null;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  address?: String;

  @Field({ nullable: true })
  @IsDate()
  @IsNotEmpty()
  createdat?: Date;

  @Field( {nullable: true })
  employerid?: number;
}
