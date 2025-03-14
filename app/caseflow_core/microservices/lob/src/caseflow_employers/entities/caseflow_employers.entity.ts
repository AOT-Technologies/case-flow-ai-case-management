import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CaseflowLocations } from 'src/caseflow_locations/entities/caseflow_locations.entity';
@Entity()
@ObjectType()
export class CaseflowEmployers {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  name: String;

  @Column({ nullable: true })
  @Field( { nullable: true })
  worksafenumber: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phonenumber?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email?: String;

  
  @Column({ nullable: true })
  @Field({ nullable: true })
  createdate?: Date;

  @Field(() => [CaseflowLocations], { nullable: true })
  @OneToMany(() => CaseflowLocations, (location) => location.employer, { cascade: true })
  locations?: CaseflowLocations[];
}
