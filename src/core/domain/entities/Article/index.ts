/**
 * Tip ->
 * entity has an identity
 * value object hasn't an identity
 */
import { IArticle } from '../../interfaces/article/IArticle';
import { IUser } from '../../interfaces/user/IUser';
import User from '../User';

export default class Article {
  private _id: string;
  private _ownerID: string;
  private _ownerName: string;
  private _ownerUsername: string;
  private _title: string;
  private _content: string;
  private _numberOfReaders: number;
  private _dateOfCreate: number;
  private _likes: IUser[];
  private _dislikes: IUser[];
  private _saves: IUser[];
  private _shares: IUser[];

  constructor(article: IArticle) {


    this._id = article.id;
    this._ownerID = article.ownerID;
    this._ownerName = article.ownerName;
    this._ownerUsername = article.ownerUsername;
    this._title = article.title;
    this._content = article.content;
    this._numberOfReaders = article.numberOfReaders;
    this._dateOfCreate = article.dateOfCreate;
    this._likes = article.likes;
    this._dislikes = article.dislikes;
    this._saves = article.saves;
    this._shares = article.shares;
  }

  public get id(): string {
    return this._id;
  }
  // this temporary method until i connect with db
  public set id(value: string) {
    this._id = value;
  }

  public get ownerID(): string {
    return this._ownerID;
  }

  public get ownerName(): string {
    return this._ownerName;
  }
  public set ownerName(value: string) {
    this._ownerName = value;
  }

  public get ownerUsername(): string {
    return this._ownerUsername;
  }
  public set ownerUsername(value: string) {
    this._ownerUsername = value;
  }

  public set ownerID(value: string) {
    this._ownerID = value;
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get content(): string {
    return this._content;
  }

  public set content(value: string) {
    this._content = value;
  }

  public get numberOfReaders(): number {
    return this._numberOfReaders;
  }

  public set numberOfReaders(value: number) {
    this._numberOfReaders = value;
  }

  public get dateOfCreate(): number {
    return this._dateOfCreate;
  }

  public set dateOfCreate(value: number) {
    this._dateOfCreate = value;
  }

  public get likes(): IUser[] {
    return this._likes;
  }

  public set likes(value: IUser[]) {
    this._likes = value;
  }

  public get dislikes(): IUser[] {
    return this._dislikes;
  }

  public set dislikes(value: IUser[]) {
    this._dislikes = value;
  }

  public get saves(): IUser[] {
    return this._saves;
  }

  public set saves(value: IUser[]) {
    this._saves = value;
  }

  public get shares(): IUser[] {
    return this._shares;
  }

  public set shares(value: IUser[]) {
    this._shares = value;
  }
}
