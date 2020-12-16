import { IDateOfBirth } from "../../interfaces/user/IDateOfBirth";
type Gender = 'male' | 'female' | 'other';
export const userValidator = {
  validateEmail(email: string): boolean {
    const validEmailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    return validEmailRegex.test(email);
  },

  validatePassword(password: string): boolean {
    if (!password || typeof password !== 'string' || password.length < 6) {
      return false;
    }
    return true;

  },

  validateFullname(fullname: string): boolean {
    if (!fullname || typeof fullname !== 'string') {
      return false;
    }
    return true;
  },

  validateDateOfBirth(dateOfBirth: IDateOfBirth): boolean {
    const { birthDay, birthMonth, birthYear } = dateOfBirth;
    if (!dateOfBirth || typeof dateOfBirth !== 'object') {
      return false;
    }
    if (
      !birthDay ||
      !birthMonth ||
      !birthYear ||
      typeof birthDay !== 'string' ||
      typeof birthMonth !== 'string' ||
      typeof birthYear !== 'string'
    ) {
      return false;
    }
    return true;
  },

  validateRate(rate: number): boolean {
    return Number.isInteger(rate);
  },

  validateUsername(username: string) {
    return typeof username === 'string';
  },

  validateID(ID: string): boolean {
    return typeof ID === 'string';
  },

  validateGender(gender: Gender): boolean {
    if (typeof gender !== 'string') {
      return false;
    }
    if (gender !== 'female' && gender !== 'male' && gender !== 'other') {
      return false;
    }
    return true;
  },

  validateAge(age: number): boolean {
    return Number.isInteger(age);
  },

  validateProfImage(profImage: string): boolean {
    return typeof profImage === 'string';
  },

  validateBio(bio: string): boolean {
    return typeof bio === 'string';
  },

}