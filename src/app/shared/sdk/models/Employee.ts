/* tslint:disable */
import {
  Attendance
} from '../index';

declare var Object: any;
export interface EmployeeInterface {
  "initials"?: string;
  "firstName": string;
  "lastName"?: string;
  "nic"?: string;
  "bocAccountNo"?: string;
  "uid"?: string;
  "joinDate"?: Date;
  "email"?: Date;
  "resignDate"?: Date;
  "salary"?: string;
  "designation"?: string;
  "contactNo"?: string;
  "isActive"?: boolean;
  "inTime"?: any;
  "outTime"?: any;
  "realm"?: string;
  "username"?: string;
  "password": string;
  "emailVerified"?: boolean;
  "verificationToken"?: string;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  accessTokens?: any[];
  attendances?: Attendance[];
}

export class Employee implements EmployeeInterface {
  "initials": string;
  "firstName": string;
  "lastName": string;
  "nic": string;
  "bocAccountNo": string;
  "uid": string;
  "joinDate": Date;
  "email": Date;
  "resignDate": Date;
  "salary": string;
  "designation": string;
  "contactNo": string;
  "isActive": boolean;
  "inTime": any;
  "outTime": any;
  "realm": string;
  "username": string;
  "password": string;
  "emailVerified": boolean;
  "verificationToken": string;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  accessTokens: any[];
  attendances: Attendance[];
  constructor(data?: EmployeeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Employee`.
   */
  public static getModelName() {
    return "Employee";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Employee for dynamic purposes.
  **/
  public static factory(data: EmployeeInterface): Employee{
    return new Employee(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Employee',
      plural: 'Employees',
      properties: {
        "initials": {
          name: 'initials',
          type: 'string'
        },
        "firstName": {
          name: 'firstName',
          type: 'string'
        },
        "lastName": {
          name: 'lastName',
          type: 'string'
        },
        "nic": {
          name: 'nic',
          type: 'string'
        },
        "bocAccountNo": {
          name: 'bocAccountNo',
          type: 'string'
        },
        "uid": {
          name: 'uid',
          type: 'string'
        },
        "joinDate": {
          name: 'joinDate',
          type: 'Date'
        },
        "email": {
          name: 'email',
          type: 'Date'
        },
        "resignDate": {
          name: 'resignDate',
          type: 'Date'
        },
        "salary": {
          name: 'salary',
          type: 'string'
        },
        "designation": {
          name: 'designation',
          type: 'string'
        },
        "contactNo": {
          name: 'contactNo',
          type: 'string'
        },
        "isActive": {
          name: 'isActive',
          type: 'boolean'
        },
        "inTime": {
          name: 'inTime',
          type: 'any'
        },
        "outTime": {
          name: 'outTime',
          type: 'any'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "verificationToken": {
          name: 'verificationToken',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: ''
        },
        attendances: {
          name: 'attendances',
          type: 'Attendance[]',
          model: 'Attendance'
        },
      }
    }
  }
}
