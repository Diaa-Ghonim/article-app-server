import Article from "../../../core/domain/entities/Article";
import User from "../../../core/domain/entities/User";
import { IUser } from "../../../core/domain/interfaces/user/IUser";
import { EntityUser } from "../entities/user";


export function mapToBusinessEntity(BusinessClass: any, typeormEntity: any) {
  let obj: any = {}

  for (const key in typeormEntity) {
    if (key === 'id') {
      obj[key] = typeormEntity[key].toString();

    }
    obj[key] = typeormEntity[key];

  }
  return new BusinessClass(obj);
}

export function mapToTypeormEntity(TypeormEntityClass: any, businessEntity: any) {
  let typeormEntity = new TypeormEntityClass();
  for (const key in businessEntity) {
    if (key !== 'id') {
      typeormEntity[key.slice(1)] = businessEntity[key];
    }
  }
  return typeormEntity;
}

export function mapToPlainObject(businessEntity: any) {
  let plainObject: any = {};
  for (const key in businessEntity) {
    plainObject[key.slice(1)] = businessEntity[key];
  }
  return plainObject;
}