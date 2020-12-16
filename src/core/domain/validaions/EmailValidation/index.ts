import { ErrorHandler } from '../../errorHandling';
export class EmailValidation {
  public email: string;
  constructor(email: string) {
    if (this.validateEmail(email)) {
      this.email = email;
    } else {
      throw new ErrorHandler(400, 'Invalid email!');
    }
  }
  validateEmail(email: string) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }
}
