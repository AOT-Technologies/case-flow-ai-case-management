
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CaseNotesService } from './case_notes.service';
import { CaseNotes } from './entities/case_note.entity';
import { CreateCaseNoteInput } from './dto/create-case_note.input';
import { UpdateCaseNoteInput } from './dto/update-case_note.input';

@Resolver(() => CaseNotes)
export class CaseNotesResolver {
  constructor(private readonly caseNotesService: CaseNotesService) {}

  @Mutation(() => CaseNotes, {name:'createCaseNote'})
  createCaseNote(@Args('createCaseNoteInput') createCaseNoteInput: CreateCaseNoteInput) {
    return this.caseNotesService.create(createCaseNoteInput);
  }
  

  @Query(() => [CaseNotes], { name: 'caseNotes' })
  findAll() {
    return this.caseNotesService.findAll();
  }

  @Query(() => CaseNotes, { name: 'caseNote' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.caseNotesService.findOne(id);
  }

  @Query(() => [CaseNotes], { name: 'caseNotesByCaseId' })
  findByCaseId(@Args('id', { type: () => Int }) id: number) {
    return this.caseNotesService.findByCaseId(id);
  }

  @Mutation(() => CaseNotes, {name:'updateCaseNote'})
  updateCaseNote(@Args('updateCaseNoteInput') updateCaseNoteInput: UpdateCaseNoteInput) {
    return this.caseNotesService.update(updateCaseNoteInput.id, updateCaseNoteInput);
  }

  @Mutation(() => CaseNotes, {name:'removeCaseNote'})
  removeCaseNote(@Args('id', { type: () => Int }) id: number) {
    return this.caseNotesService.remove(id);
  }
}



