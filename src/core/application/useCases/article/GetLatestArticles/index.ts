import { BaseUseCase } from '../../BaseUseCase';
import Article from '../../../../domain/entities/Article';
import IArticleRepository from '../../../../domain/interfaces/article/IArticleRepository';

export default class GetLatestArticles extends BaseUseCase {
  articleRepository: IArticleRepository;
  constructor(articleRepository: IArticleRepository) {
    super();
    this.articleRepository = articleRepository;
  }

  execute(): Promise<Article[]> {
    return this.articleRepository.getLatestArticles();
  }
}
