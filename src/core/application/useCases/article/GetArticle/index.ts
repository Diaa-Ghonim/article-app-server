import { BaseUseCase } from '../../BaseUseCase';
import Article from '../../../../domain/entities/Article';
import IArticleRepository from '../../../../domain/interfaces/article/IArticleRepository';

export default class GetArticle extends BaseUseCase {
  private readonly articleRepository: IArticleRepository;
  constructor(articleRepository: IArticleRepository) {
    super();
    this.articleRepository = articleRepository;
  }

  execute(username: string, id: string): Promise<Article> {
    return this.articleRepository.getArticle(username, id);
  }
}
