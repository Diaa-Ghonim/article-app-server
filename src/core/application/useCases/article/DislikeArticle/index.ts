import { BaseUseCase } from '../../BaseUseCase';
import IArticleRepository from '../../../../domain/interfaces/article/IArticleRepository';
import User from '../../../../domain/entities/User';

export default class DislikeArticle extends BaseUseCase {
  private articleRepository: IArticleRepository;
  constructor(articleRepository: IArticleRepository) {
    super();
    this.articleRepository = articleRepository;
  }

  execute(articleID: string, mainUser: User): Promise<User> {
    return this.articleRepository.dislikeArticle(articleID, mainUser);
  }
}
