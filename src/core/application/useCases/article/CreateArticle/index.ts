import { BaseUseCase } from '../../BaseUseCase';
import Article from '../../../../domain/entities/Article';
import IArticleRepository from '../../../../domain/interfaces/article/IArticleRepository';
import IClientArticle from '../../../../domain/interfaces/article/IClientArticle';
import { ErrorHandler } from '../../../../domain/errorHandling';
import { articleValidator } from '../../../../domain/validaions/articleValidator';


export default class CreateArticle extends BaseUseCase {
  private readonly articleRepository: IArticleRepository;
  constructor(articleRepository: IArticleRepository) {
    super();
    this.articleRepository = articleRepository;
  }

  execute({ title, content }: IClientArticle, userInfo: any): Promise<Article> {
    try {
      if (!articleValidator.validateTitle(title)) {
        throw new ErrorHandler(400, 'tilte not exist or not string');
      }

      if (!articleValidator.validateContent(content)) {
        throw new ErrorHandler(400, 'content not exist or not string');
      }
      const generatedUUID = this.articleRepository.generateID();

      const articleInfo = {
        title,
        content,
        id: generatedUUID,
        ownerName: userInfo.name,
        ownerUsername: userInfo.username,
        ownerID: userInfo.id,
        dateOfCreate: Date.now(),
        numberOfReaders: 25,
        likes: [],
        dislikes: [],
        saves: [],
        shares: [],
      };
      const article = new Article(articleInfo);
      return this.articleRepository.createArticle(article);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
