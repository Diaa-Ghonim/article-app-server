import { BaseUseCase } from '../../BaseUseCase';
import Article from '../../../../domain/entities/Article';
import IArticleRepository from '../../../../domain/interfaces/article/IArticleRepository';
import IclientArticle from '../../../../domain/interfaces/article/IClientArticle';
import User from '../../../../domain/entities/User';

export default class ShareArticle extends BaseUseCase {
  private articleRepository: IArticleRepository;
  constructor(articleRepository: IArticleRepository) {
    super();
    this.articleRepository = articleRepository;
  }

  execute(articleID: string, mainUser: User): Promise<User> {
    return this.articleRepository.shareArticle(articleID, mainUser);
  }
}
