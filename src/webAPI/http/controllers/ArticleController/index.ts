import ArticleRepository from '../../../../infrastructure/db/repositories/article';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../BaseController';
import {
  CreateArticle,
  DeleteArticle,
  DislikeArticle,
  EditArticle,
  GetArticle,
  GetArticles,
  GetDislikedArticles,
  GetLatestArticles,
  GetLikedArticles,
  GetSavedArticles,
  GetSharedArticles,
  GetTopReadingArticles,
  GetUserArticles,
  LikeArticle,
  RemoveDislikeFromTheArticle,
  RemoveLikeFromTheArticle,
  RemoveSaveFromTheArticle,
  SaveArticle,
  ShareArticle,
} from '../../../../core/application/useCases/article';
import { mapToPlainObject } from '../../../../infrastructure/db/helper/map.helpers';


export default new (class ArticleController extends BaseController {
  constructor() {
    super();
  }

  async createArticle(request: Request, response: Response, next: NextFunction) {
    try {
      const body = request.body;
      const mainUser = request.getUserInfo();
      const createArticle = new CreateArticle(new ArticleRepository());
      const businessArticle = await createArticle.execute(body, mainUser);
      const plainArticle = mapToPlainObject(businessArticle);
      response.endWithSuccess(201, plainArticle);
    } catch (error) {
      next(error);
    }
  }

  async editArticle(request: Request, response: Response, next: NextFunction) {
    try {
      const body = request.body;
      const editArticle = new EditArticle(new ArticleRepository());
      const businessArticle = await editArticle.execute(body);
      const plainArticle = mapToPlainObject(businessArticle);
      response.endWithSuccess(201, plainArticle);
    } catch (error) {
      next(error);
    }
  }

  async deleteArticle(request: Request, response: Response, next: NextFunction) {
    try {
      const { articleID } = request.params;
      const deleteArticle = new DeleteArticle(new ArticleRepository());
      await deleteArticle.execute(articleID);
      response.endWithSuccess(201, { deletedID: articleID });
    } catch (error) {
      next(error);
    }
  }

  async likeArticle(request: Request, response: Response, next: NextFunction) {
    try {
      const { articleID } = request.body;
      const mainUser = request.getUserInfo();
      const likeArticle = new LikeArticle(new ArticleRepository());
      await likeArticle.execute(articleID, mainUser);
      response.endWithSuccess(201, mainUser);
    } catch (error) {
      next(error);
    }
  }

  async dislikeArticle(request: Request, response: Response, next: NextFunction) {
    try {
      const { articleID } = request.body;
      const mainUser = request.getUserInfo();
      const dislikeArticle = new DislikeArticle(new ArticleRepository());
      await dislikeArticle.execute(articleID, mainUser);
      response.endWithSuccess(201, mainUser);
    } catch (error) {
      next(error);
    }
  }

  async removeLikeFromTheArticle(request: Request, response: Response, next: NextFunction) {
    try {
      const { articleID } = request.body;
      const mainUser = request.getUserInfo();
      const removeLikeFromTheArticle = new RemoveLikeFromTheArticle(new ArticleRepository());
      await removeLikeFromTheArticle.execute(articleID, mainUser);
      response.endWithSuccess(201, mainUser);
    } catch (error) {
      next(error);
    }
  }

  async removeDislikeFromTheArticle(request: Request, response: Response, next: NextFunction) {
    try {
      const { articleID } = request.body;
      const mainUser = request.getUserInfo();
      const removeDislikeFromTheArticle = new RemoveDislikeFromTheArticle(
        new ArticleRepository()
      );
      await removeDislikeFromTheArticle.execute(articleID, mainUser);
      response.endWithSuccess(201, mainUser);
    } catch (error) {
      next(error);
    }
  }

  async shareArticle(request: Request, response: Response, next: NextFunction) {
    try {
      const { articleID } = request.body;
      const mainUser = request.getUserInfo();
      const shareArticle = new ShareArticle(new ArticleRepository());
      await shareArticle.execute(articleID, mainUser);
      response.endWithSuccess(201, mainUser);
    } catch (error) {
      next(error);
    }
  }

  async saveArticle(request: Request, response: Response, next: NextFunction) {
    try {
      const { articleID } = request.body;
      const mainUser = request.getUserInfo();
      const saveArticle = new SaveArticle(new ArticleRepository());
      await saveArticle.execute(articleID, mainUser);
      response.endWithSuccess(201, mainUser);
    } catch (error) {
      next(error);
    }
  }

  async removeSaveFromArticle(request: Request, response: Response, next: NextFunction) {
    try {
      const { articleID } = request.body;
      const mainUser = request.getUserInfo();
      const saveArticle = new RemoveSaveFromTheArticle(new ArticleRepository());
      await saveArticle.execute(articleID, mainUser);
      response.endWithSuccess(201, mainUser);
    } catch (error) {
      next(error);
    }
  }

  async getArticle(request: Request, response: Response, next: NextFunction) {

    try {
      let { username, articleID } = request.params;
      /**
       * new GetArticleUseCase + inject
       * i use injection here not singleton obj from use cases
       *  because inversion of control i need pass repository here
       */
      const getArticle = new GetArticle(new ArticleRepository());
      // after get data i will map it again to data i can send it to client
      const businessArticle = await getArticle.execute(username, articleID);
      const plainArticle = mapToPlainObject(businessArticle);
      response.endWithSuccess(201, plainArticle);
    } catch (error) {
      next(error);
    }
  }

  async getArticles(request: Request, response: Response, next: NextFunction) {
    try {
      const getArticles = new GetArticles(new ArticleRepository());
      const businessArticlesResult = await getArticles.execute();
      const plainArticles = businessArticlesResult.map(businessArticle => mapToPlainObject(businessArticle));
      response.endWithSuccess(200, plainArticles);
    } catch (error) {
      next(error);
    }
  }

  async getLatestArticles(request: Request, response: Response, next: NextFunction) {
    try {
      const getArticles = new GetLatestArticles(new ArticleRepository());
      const businessArticlesResult = await getArticles.execute();
      const plainArticles = businessArticlesResult.map(businessArticle => mapToPlainObject(businessArticle));
      response.endWithSuccess(200, plainArticles);
    } catch (error) {
      next(error);
    }
  }
  async getUserArticles(request: Request, response: Response, next: NextFunction) {
    try {
      const { username } = request.params;
      const getUserArticles = new GetUserArticles(new ArticleRepository());
      const userBusinessArticlesResult = await getUserArticles.execute(username);
      const plainUserArticles = userBusinessArticlesResult.map(businessArticle => mapToPlainObject(businessArticle));
      response.endWithSuccess(200, plainUserArticles);
    } catch (error) {
      next(error);
    }
  }

  async getTopReadingArticles(request: Request, response: Response, next: NextFunction) {
    try {
      const getTopReadingArticles = new GetTopReadingArticles(new ArticleRepository());
      const topReadingBusinessArticlesResult = await getTopReadingArticles.execute();
      const plainTopReadingArticles = topReadingBusinessArticlesResult.map(businessArticle => mapToPlainObject(businessArticle));
      response.endWithSuccess(200, plainTopReadingArticles);
    } catch (error) {
      next(error);
    }
  }

  async getLikedArticles(request: Request, response: Response, next: NextFunction) {
    try {
      const { username } = request.params;
      const getLikedArticles = new GetLikedArticles(new ArticleRepository());
      const businessLikedArticlesResult = await getLikedArticles.execute(username);
      const plainlikedArticles = businessLikedArticlesResult.map(businessArticle => mapToPlainObject(businessArticle));
      response.endWithSuccess(200, plainlikedArticles);
    } catch (error) {
      next(error);
    }
  }

  async getDislikedArticles(request: Request, response: Response, next: NextFunction) {
    try {
      const { username } = request.params;
      const getDislikedArticles = new GetDislikedArticles(new ArticleRepository());
      const businessDislikedArticlesResult = await getDislikedArticles.execute(username);
      const plainDislikedArticles = businessDislikedArticlesResult.map(businessArticle => mapToPlainObject(businessArticle));
      response.endWithSuccess(200, plainDislikedArticles);
    } catch (error) {
      next(error);
    }
  }

  async getSavedArticles(request: Request, response: Response, next: NextFunction) {
    try {
      const { username } = request.params;
      const getSavedArticles = new GetSavedArticles(new ArticleRepository());
      const businessSavedArticlesResult = await getSavedArticles.execute(username);
      const plainSavedArticles = businessSavedArticlesResult.map(businessArticle => mapToPlainObject(businessArticle));
      response.endWithSuccess(200, plainSavedArticles);
    } catch (error) {
      next(error);
    }
  }

  async getSharedArticles(request: Request, response: Response, next: NextFunction) {
    try {
      const { username } = request.params;
      const getSharedArticles = new GetSharedArticles(new ArticleRepository());
      const businessSharedArticlesResult = await getSharedArticles.execute(username);
      const plainSharedArticles = businessSharedArticlesResult.map(businessArticle => mapToPlainObject(businessArticle));
      response.endWithSuccess(200, plainSharedArticles);
    } catch (error) {
      next(error);
    }
  }

})();
