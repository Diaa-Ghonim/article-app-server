import User from "../../entities/User";

export interface IUser {
  id: string;
  name: string;
  age: number;
  username: string;
  email: string;
  password: string;
  dateOfBirth: {
    birthDay: string,
    birthMonth: string,
    birthYear: string
  };
  gender: string;
  profImage: string;
  bio: string;
  rate: number;
  followers: User[];
  following: User[]
}
