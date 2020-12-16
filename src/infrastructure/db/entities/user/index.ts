import { Entity, ObjectIdColumn, Column, ObjectID, OneToMany } from 'typeorm';
import User from '../../../../core/domain/entities/User';

/**
 * here we can name Entity inside it between paranthese
 * and also can add constructor to Entity class
 *
 */
@Entity()
export class EntityUser {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ type: 'string' })
  username: string;

  @Column({ type: 'string' })
  name: string;

  @Column({ type: 'string' })
  email: string;

  @Column({ type: 'string' })
  password: string;

  @Column({ type: 'string' })
  profImage: string;

  @Column({ type: 'string', name: 'bio', nullable: true })
  bio?: string | undefined;

  @Column({ nullable: true })
  dateOfBirth: object;

  @Column({ type: 'number', name: 'age', nullable: true })
  age: number | undefined;

  @Column({ type: 'number' })
  rate: number;

  @Column({ type: 'array' })
  followers: User[];

  @Column({ type: 'array' })
  following: User[];

}
