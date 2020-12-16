
export const articleValidator = {

  validateArticleID(articleID: string): boolean {
    if (!articleID) return false;
    return typeof articleID === 'string';
  },

  validateTitle(title: string): boolean {
    if (!title) return false;
    return typeof title === 'string';
  },

  validateContent(content: string): boolean {
    if (!content) return false;
    return typeof content === 'string';
  }
}
