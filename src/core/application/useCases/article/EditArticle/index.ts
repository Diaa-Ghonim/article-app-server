import { BaseUseCase } from '../../BaseUseCase';
import Article from '../../../../domain/entities/Article';
import IArticleRepository from '../../../../domain/interfaces/article/IArticleRepository';
import { articleValidator } from '../../../../domain/validaions/articleValidator';
import { ErrorHandler } from '../../../../domain/errorHandling';
import { IEditArticle } from '../../../../domain/interfaces/article/IEditArticle';

export default class EditArticle extends BaseUseCase {
  private articleRepository: IArticleRepository;
  constructor(articleRepository: IArticleRepository) {
    super();
    this.articleRepository = articleRepository;
  }

  // any type temporary
  execute({ articleID, title, content }: IEditArticle): Promise<Article> {
    try {
      if (!articleValidator.validateArticleID(articleID)) {
        throw new ErrorHandler(400, 'articleID not exist or articleID not string');
      }
      if (!articleValidator.validateTitle(title)) {
        throw new ErrorHandler(400, 'title not exist or title not string');
      }
      if (!articleValidator.validateContent(content)) {
        throw new ErrorHandler(400, 'content not exist or not string');
      }
      const articleInfo = {
        articleID,
        title,
        content,
      };
      return this.articleRepository.editArticle(articleInfo);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
