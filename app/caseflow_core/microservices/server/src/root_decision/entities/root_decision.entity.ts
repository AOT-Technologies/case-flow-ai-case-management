import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class RootDecision {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ type: "date", nullable: true })
  @Field({ nullable: true })
  rootDecisionDate?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  rootDecisionAgency?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  decisionMaker?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  referenceNumber?: string;

  @Column({ type: "date", nullable: true })
  @Field({ nullable: true })
  decisionDate?: string;
}
