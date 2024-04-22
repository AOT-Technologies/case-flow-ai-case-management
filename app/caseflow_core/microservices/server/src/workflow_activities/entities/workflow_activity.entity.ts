
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Cases } from 'src/cases/entities/cases.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class WorkflowActivity {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  taskid: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  caseid: number;

  @Column({ nullable: true })
  @Field()
  creationdate: Date;

  @Column({ nullable: true })
  @Field()
  userid: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  taskname: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  formurl: string;
  
  @Column({ nullable: true })
  @Field({ nullable: true })
  status: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  selectedform: string;

  @ManyToOne(() => Cases, (cases) => cases.id)
  @Field(() => Cases, { nullable: true })
  @JoinColumn({ name: 'id' })
  case: Cases;
}
