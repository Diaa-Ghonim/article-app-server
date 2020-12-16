import { BaseUseCase } from '../../BaseUseCase';
import Article from '../../../../domain/entities/Article';
import IArticleRepository from '../../../../domain/interfaces/article/IArticleRepository';

export default class GetUserDislikedArticles extends BaseUseCase {
  articleRepository: IArticleRepository;
  constructor(articleRepository: IArticleRepository) {
    super();
    this.articleRepository = articleRepository;
  }

  execute(username: string): Promise<Article[]> {
    return this.articleRepository.getDislikedArticles(username);
  }
}
