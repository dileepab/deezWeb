/* tslint:disable */
import {
  Employee
} from '../index';

declare var Object: any;
export interface AttendanceInterface {
  "uid": string;
  "name"?: string;
  "dateTime"?: Date;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "employeeId"?: any;
  employee?: Employee;
}

export class Attendance implements AttendanceInterface {
  "uid": string;
  "name": string;
  "dateTime": Date;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  "employeeId": any;
  employee: Employee;
  constructor(data?: AttendanceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Attendance`.
   */
  public static getModelName() {
    return "Attendance";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Attendance for dynamic purposes.
  **/
  public static factory(data: AttendanceInterface): Attendance{
    return new Attendance(data);
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
      name: 'Attendance',
      plural: 'Attendances',
      properties: {
        "uid": {
          name: 'uid',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "dateTime": {
          name: 'dateTime',
          type: 'Date'
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
        "employeeId": {
          name: 'employeeId',
          type: 'any'
        },
      },
      relations: {
        employee: {
          name: 'employee',
          type: 'Employee',
          model: 'Employee'
        },
      }
    }
  }
}
