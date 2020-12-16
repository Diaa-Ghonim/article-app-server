import { BaseUseCase } from '../../BaseUseCase';
import IArticleRepository from '../../../../domain/interfaces/article/IArticleRepository';

export default class DeleteArticle extends BaseUseCase {
  private articleRepository: IArticleRepository;
  constructor(articleRepository: IArticleRepository) {
    super();
    this.articleRepository = articleRepository;
  }

  execute(articleID: string): Promise<boolean> {
    return this.articleRepository.deleteArticle(articleID);
  }
}
