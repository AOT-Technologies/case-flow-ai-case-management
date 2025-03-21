import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { RootDecision } from "src/root_decision/entities/root_decision.entity";
import { IssueDecision } from "src/issue_decision/entities/issue_decision.entity";
import { Cases } from "src/cases/entities/cases.entity";
import { ObjectType, Field, ID } from "@nestjs/graphql";

@Entity()
@ObjectType()
export class CaseDecision {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  caseId: number;

  @Column()
  @Field()
  rootDecisionId: number;

  @Column()
  @Field()
  issueDecisionId: number;

  @ManyToOne(() => Cases)
  @Field(() => Cases, { nullable: true })
  case?: Cases;

  @ManyToOne(() => RootDecision)
  @Field(() => RootDecision, { nullable: true })
  rootDecision?: RootDecision;

  @ManyToOne(() => IssueDecision)
  @Field(() => IssueDecision, { nullable: true })
  issueDecision?: IssueDecision;
}
