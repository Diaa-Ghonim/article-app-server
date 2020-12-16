import IArticleRepository from '../../../../core/domain/interfaces/article/IArticleRepository';
import Article from '../../../../core/domain/entities/Article';
import User from '../../../../core/domain/entities/User';
import { getRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { EntityArticle } from '../../entities/article';
import { v4 as uuidv4 } from 'uuid';
import { EntityUser } from '../../entities/user';
import { ErrorHandler } from '../../../../core/domain/errorHandling';
import { IEditArticle } from '../../../../core/domain/interfaces/article/IEditArticle';
import { mapToBusinessEntity, mapToTypeormEntity } from '../../helper/map.helpers';


export default class ArticleRepository implements IArticleRepository {
  private articleRepo: any;/** get type of it from type orm  */
  private checkForHexRegExp;
  constructor() {
    this.articleRepo = getRepository(EntityArticle);
    this.checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
  }

  generateID() {
    return uuidv4();
  }

  async createArticle(article: Article): Promise<Article> {
    try {

      const articleTypeormEntity = mapToTypeormEntity(EntityArticle, article);
      // await this.articleRepo.clear();
      const articleTypeormEntityResult = await this.articleRepo.save(articleTypeormEntity);
      /**
       * very important tip
       *
       * here after i save persistentEntity the id which created by db will add to
       * persistentEntity automatically
       * and you can pass persistentEntity to function that will convert it to BusinessEntity
       * and also you can pass articleResult that returned from db
       *
       */
      const articleBusinessEntity = mapToBusinessEntity(Article, articleTypeormEntityResult);
      return Promise.resolve(articleBusinessEntity);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async editArticle({ articleID, title, content }: IEditArticle): Promise<Article> {
    try {
      /**
       * important notes
       *
       * in update or edit method i will not use persistent
       * and i will save data direct from article business entity
       *
       * also i can use string id or id from type ObjectID to find data from db
       *
       */

      const id = new ObjectID(articleID);

      const articleTypeormEntityResult = await this.articleRepo.findOne(articleID || id);
      if (!articleTypeormEntityResult) throw new ErrorHandler(404, 'this article not exist ');
      articleTypeormEntityResult.content = content;
      articleTypeormEntityResult.title = title;
      await this.articleRepo.save(articleTypeormEntityResult);
      const articleBusinessEntity = mapToBusinessEntity(Article, articleTypeormEntityResult);
      return Promise.resolve(articleBusinessEntity);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteArticle(articleID: string): Promise<boolean> {
    try {
      await this.articleRepo.delete(articleID)
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async likeArticle(articleID: string, user: User): Promise<User> {
    try {
      const articleTypeormEntityResult = await this.articleRepo.findOne(articleID);
      if (!articleTypeormEntityResult) throw new ErrorHandler(404, 'this article not found');
      const { dislikes } = articleTypeormEntityResult;
      const isUserLikedArticle = articleTypeormEntityResult.likes.find(
        (likedUser: User) => likedUser.username === user.username
      );
      if (isUserLikedArticle) throw new ErrorHandler(400, 'article is already liked');
      articleTypeormEntityResult.likes.push(user);
      articleTypeormEntityResult.dislikes = dislikes.filter(
        (dislikedUser: User) => dislikedUser.username !== user.username
      );
      await this.articleRepo.save(articleTypeormEntityResult);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error.message);
    }
  }

  async removeLikeFromTheArticle(articleID: string, user: User): Promise<User> {
    try {
      const articleTypeormEntityResult = await this.articleRepo.findOne(articleID);
      if (!articleTypeormEntityResult) throw new ErrorHandler(404, 'this article not found');
      const { likes } = articleTypeormEntityResult;
      articleTypeormEntityResult.likes = likes.filter(
        (likedUser: User) => likedUser.username !== user.username
      );
      await this.articleRepo.save(articleTypeormEntityResult);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async dislikeArticle(articleID: string, user: User): Promise<User> {
    try {
      const articleTypeormEntityResult = await this.articleRepo.findOne(articleID);
      if (!articleTypeormEntityResult) throw new ErrorHandler(404, 'this article not exist ');
      const { likes } = articleTypeormEntityResult;
      const isUserDislikedArticle = articleTypeormEntityResult.dislikes.find(
        (dislikedUser: User) => dislikedUser.username === user.username
      );
      if (isUserDislikedArticle) throw new ErrorHandler(400, 'article is already disliked ');
      articleTypeormEntityResult.dislikes.push(user);
      articleTypeormEntityResult.likes = likes.filter((likedUser: User) => likedUser.username !== user.username)
      await this.articleRepo.save(articleTypeormEntityResult);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async removeDislikeFromTheArticle(articleID: string, user: User): Promise<User> {
    try {
      const articleTypeormEntityResult = await this.articleRepo.findOne(articleID);
      if (!articleTypeormEntityResult) throw new ErrorHandler(404, 'this article not exist ');
      const { dislikes } = articleTypeormEntityResult;
      articleTypeormEntityResult.dislikes = dislikes.filter(
        (dislikedUser: User) => dislikedUser.username !== user.username
      );
      await this.articleRepo.save(articleTypeormEntityResult);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async saveArticle(articleID: string, user: User): Promise<User> {
    try {
      const articleTypeormEntityResult = await this.articleRepo.findOne(articleID);
      if (!articleTypeormEntityResult) throw new ErrorHandler(404, 'this article not exist ');
      const isUserSavedArticle = articleTypeormEntityResult.saves.find((user: User) => user.username === user.username);
      if (isUserSavedArticle) throw new ErrorHandler(400, 'article is already saved');
      articleTypeormEntityResult.saves.push(user);
      await this.articleRepo.save(articleTypeormEntityResult);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async removeSaveFromTheArticle(articleID: string, user: User): Promise<User> {
    try {
      const articleTypeormEntityResult = await this.articleRepo.findOne(articleID);
      if (!articleTypeormEntityResult) throw new ErrorHandler(404, 'this article not exist ');
      const { saves } = articleTypeormEntityResult;
      articleTypeormEntityResult.saves = saves.filter((savedUser: User) => savedUser.username !== user.username);
      await this.articleRepo.save(articleTypeormEntityResult);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async shareArticle(articleID: string, user: User): Promise<User> {
    try {
      const articleTypeormEntityResult = await this.articleRepo.findOne(articleID);
      if (!articleTypeormEntityResult) throw new ErrorHandler(404, 'this article not exist ');
      const isUserSharedArticle = articleTypeormEntityResult.shares.find(
        (user: User) => user.username === user.username
      );
      if (isUserSharedArticle) throw new ErrorHandler(400, 'this article is already shared');
      articleTypeormEntityResult.shares.push(user);
      await this.articleRepo.save(articleTypeormEntityResult);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getArticle(username: string, articleID: string): Promise<Article> {
    try {
      /**
       * increment numberOfReaders when user send to request the article
       * i want check if user who send request send it again during 24h
       * or not if he did, doesn't increment number of readers
       * if user doesn't get it before , increment number of readers
       *
       */
      /**
       * this step because articleId must be a single String of 12 bytes
       *  or a string of 24 hex characters
       *
       * so i check it with this regexp
       */

      const isArticleIdValid = this.checkForHexRegExp.test(articleID);
      if (!isArticleIdValid) throw new ErrorHandler(404, 'this article not found');
      const articleTypeormEntityResult = await this.articleRepo.findOne(articleID);
      if (!articleTypeormEntityResult) throw new ErrorHandler(404, 'this article not found');
      articleTypeormEntityResult.numberOfReaders += 1;
      await this.articleRepo.save(articleTypeormEntityResult);
      const articleBusinessEntity = mapToBusinessEntity(Article, articleTypeormEntityResult);
      return Promise.resolve(articleBusinessEntity);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getArticles(): Promise<Article[]> {
    try {
      const articlesTypeormEntitiesResult = await this.articleRepo.find();
      const result: Article[] = [];
      articlesTypeormEntitiesResult.forEach((articleTypeormEntity: EntityArticle) => {
        const articleBusinessEntity = mapToBusinessEntity(Article, articleTypeormEntity);
        result.push(articleBusinessEntity);
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getLatestArticles(): Promise<Article[]> {
    try {
      const articlesTypeormEntitiesResult = await this.articleRepo.find();
      const result: Article[] = [];
      articlesTypeormEntitiesResult.forEach((articleTypeormEntity: EntityArticle) => {
        const articleBusinessEntity = mapToBusinessEntity(Article, articleTypeormEntity);
        result.push(articleBusinessEntity);
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getTopReadingArticles(): Promise<Article[]> {
    try {
      const articlesTypeormEntitiesResult = await this.articleRepo.find();
      const sortedArray = articlesTypeormEntitiesResult.sort((a: EntityArticle, b: EntityArticle) => {
        return b.numberOfReaders - a.numberOfReaders;
      }, 0);
      const result: Article[] = [];
      sortedArray.forEach((articleTypeormEntity: EntityArticle) => {
        const articleBusinessEntity = mapToBusinessEntity(Article, articleTypeormEntity);
        result.push(articleBusinessEntity);
      });
      return Promise.resolve(result.slice(0, 3));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getUserArticles(username: string): Promise<Article[]> {
    try {
      const userRepo = getRepository(EntityUser);
      const userTypeormEntityResult = await userRepo.findOne({ username: username });
      if (!userTypeormEntityResult) throw new ErrorHandler(404, 'this user not found ');
      const userID = userTypeormEntityResult.id.toString();
      const articlesTypeormEntitiesResult = await this.articleRepo.find({ ownerID: userID });
      const result: Article[] = [];
      articlesTypeormEntitiesResult.forEach((articleTypeormEntity: EntityArticle) => {
        const articleBusinessEntity = mapToBusinessEntity(Article, articleTypeormEntity);
        result.push(articleBusinessEntity);
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getLikedArticles(username: string): Promise<Article[]> {
    try {
      const articlesTypeormEntitiesResult = await this.articleRepo.find();
      const articlesLiked: Article[] = [];
      articlesTypeormEntitiesResult.forEach((articleTypeormEntity: EntityArticle) => {
        const check = articleTypeormEntity.likes.find((user) => {
          return user.username === username;
        });
        if (check) {
          const articleBusinessEntity = mapToBusinessEntity(Article, articleTypeormEntity);
          articlesLiked.push(articleBusinessEntity);
        }
      });
      return Promise.resolve(articlesLiked);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getDislikedArticles(username: string): Promise<Article[]> {
    try {
      const articlesTypeormEntitiesResult = await this.articleRepo.find();
      const articlesDisliked: Article[] = [];
      articlesTypeormEntitiesResult.forEach((articleTypeormEntity: EntityArticle) => {
        const check = articleTypeormEntity.dislikes.find((user) => {
          return user.username === username;
        });
        if (check) {
          const articleBusinessEntity = mapToBusinessEntity(Article, articleTypeormEntity);
          articlesDisliked.push(articleBusinessEntity);
        }
      });
      return Promise.resolve(articlesDisliked);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getSharedArticles(username: string): Promise<Article[]> {
    try {
      const articlesTypeormEntitiesResult = await this.articleRepo.find();
      const articlesShared: Article[] = [];
      articlesTypeormEntitiesResult.forEach((articleTypeormEntity: EntityArticle) => {
        const check = articleTypeormEntity.shares.find((user) => {
          return user.username === username;
        });
        if (check) {
          const articleBusinessEntity = mapToBusinessEntity(Article, articleTypeormEntity);
          articlesShared.push(articleBusinessEntity);
        }
      });
      return Promise.resolve(articlesShared);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getSavedArticles(username: string): Promise<Article[]> {
    try {
      const articlesTypeormEntitiesResult = await this.articleRepo.find();
      const articlesSaved: Article[] = [];
      articlesTypeormEntitiesResult.forEach((articleTypeormEntity: EntityArticle) => {
        const check = articleTypeormEntity.saves.find((user) => {
          return user.username === username;
        });
        if (check) {
          const articleBusinessEntity = mapToBusinessEntity(Article, articleTypeormEntity);
          articlesSaved.push(articleBusinessEntity);
        }
      });
      return Promise.resolve(articlesSaved);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}


  // const articleTypeormEntity = mapToTypeormEntity(EntityArticle, article);
  // const articleBusinessEntity = mapToBusinessEntity(Article, articleTypeormEntityResult);