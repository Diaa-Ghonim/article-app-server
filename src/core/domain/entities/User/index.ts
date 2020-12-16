import { IUser } from '../../interfaces/user/IUser';
export default class User {
  private _id: any;
  private _name: string;
  private _age: number;
  private _username: string;
  private _email: string;
  private _password: string;
  private _profImage: string;
  private _bio: string;
  private _dateOfBirth: {
    birthDay: string;
    birthMonth: string;
    birthYear: string;
  };
  private _rate: number;
  private _followers: User[];
  private _following: User[];


  constructor(user: IUser) {

    this._id = user.id;
    this._name = user.name;
    this._age = user.age;
    this._username = user.username;
    this._email = user.email;
    this._password = user.password;
    this._profImage = user.profImage;
    this._bio = user.bio;
    this._dateOfBirth = user.dateOfBirth;
    this._rate = user.rate;
    this._followers = user.followers;
    this._following = user.following;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get age(): number {
    return this._age;
  }

  public set age(value: number) {
    this._age = value;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get password(): string {
    return this._password;
  }

  public set password(value: string) {
    this._password = value;
  }

  public get dateOfBirth(): {
    birthDay: string;
    birthMonth: string;
    birthYear: string;
  } {
    return this._dateOfBirth;
  }

  public set dateOfBirth(value: {
    birthDay: string;
    birthMonth: string;
    birthYear: string;
  }) {
    this._dateOfBirth = value;
  }

  public get profImage(): string {
    return this._profImage;
  }

  public set profImage(value: string) {
    this._profImage = value;
  }

  public get bio(): string {
    return this._bio;
  }

  public set bio(value: string) {
    this._bio = value;
  }

  public set rate(v: number) {
    this._rate = v;
  }

  public get rate(): number {
    return this._rate;
  }

  public get followers(): User[] {
    return this._followers;
  }

  public set followers(value: User[]) {
    this._followers = value;
  }

  public get following(): User[] {
    return this._following;
  }

  public set following(value: User[]) {
    this._following = value;
  }
}
