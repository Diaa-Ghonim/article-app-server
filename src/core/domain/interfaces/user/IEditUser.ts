import { IDateOfBirth } from './IDateOfBirth';
export interface IEditUser {
  profImage: string;
  name: string;
  username: string;
  bio: string;
  // dateOfBirth: IDateOfBirth;
  birthDay: string,
  birthMonth: string,
  birthYear: string
}
