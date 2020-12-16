import Article from '../../entities/Article';
import User from '../../entities/User';
import { IEditArticle } from '../../interfaces/article/IEditArticle';
export default interface IArticleRepository {
  generateID(): string;
  createArticle(article: Article): Promise<Article>;
  editArticle(articleInfo: IEditArticle): Promise<Article>;
  deleteArticle(articleID: string): Promise<boolean>;
  likeArticle(articleID: string, user: User): Promise<User>;
  removeLikeFromTheArticle(articleID: string, user: User): Promise<User>;
  dislikeArticle(articleID: string, user: User): Promise<User>;
  removeDislikeFromTheArticle(articleID: string, user: User): Promise<User>;
  shareArticle(articleID: string, user: User): Promise<User>;
  saveArticle(articleID: string, user: User): Promise<User>;
  removeSaveFromTheArticle(articleID: string, user: User): Promise<User>;
  getUserArticles(username: string): Promise<Article[]>;
  getLikedArticles(username: string): Promise<Article[]>;
  getDislikedArticles(username: string): Promise<Article[]>;
  getSharedArticles(username: string): Promise<Article[]>;
  getSavedArticles(username: string): Promise<Article[]>;
  getArticle(username: string, id: string): Promise<Article>;
  getArticles(): Promise<Article[]>;
  getLatestArticles(): Promise<Article[]>;
  getTopReadingArticles(): Promise<Article[]>;

  // unsaveArticle(): Promise<boolean>;
}
