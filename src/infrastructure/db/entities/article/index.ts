import { Entity, ObjectID, ObjectIdColumn, Column, ManyToOne } from 'typeorm';
import Article from '../../../../core/domain/entities/Article';
import User from '../../../../core/domain/entities/User';
import { EntityUser } from '../user';

@Entity()
export class EntityArticle {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ type: 'string' })
  ownerUsername: string;

  @Column({ type: 'string' })
  ownerName: string;

  @Column({ type: 'string' })
  title: string;

  @Column({ type: 'string' })
  content: string;

  @Column({ type: 'number' })
  numberOfReaders: number;

  @Column({ type: 'number' })
  dateOfCreate: number;

  @Column({ type: 'string' })
  ownerID: string;

  @Column('array')
  likes: User[];

  @Column('array')
  dislikes: User[];

  @Column('array')
  saves: User[];

  @Column('array')
  shares: User[];

  // @ManyToOne((type) => EntityUser, (user) => user.articles)
  // user: EntityUser;
}
