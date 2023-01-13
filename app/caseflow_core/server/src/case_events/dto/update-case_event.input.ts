import { CreateCaseEventInput } from './create-case_event.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

/**
 * Summary :  Update input DTO for Case events
 * Created By : Akhila U S
 */
@InputType()
export class UpdateCaseEventInput extends PartialType(CreateCaseEventInput) {
  @Field(() => Int)
  id: number;
}