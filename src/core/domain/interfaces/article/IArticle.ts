import { IUser } from '../user/IUser';
export interface IArticle {
  id: string;
  ownerID: string;
  ownerName: string;
  ownerUsername: string;
  title: string;
  content: string;
  numberOfReaders: number;
  dateOfCreate: number;
  likes: IUser[];
  dislikes: IUser[];
  saves: IUser[];
  shares: IUser[];
}