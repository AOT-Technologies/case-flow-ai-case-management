import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class IssueDecision {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  issue?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  eaoRole?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  outcome?: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  @Field({ nullable: true })
  impact?: number;
}
