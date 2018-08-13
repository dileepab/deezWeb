/* tslint:disable */
import {
  Employee
} from '../index';

declare var Object: any;
export interface TargetInterface {
  "date"?: Date;
  "target"?: any;
  "id"?: any;
  "employeeId"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  employee?: Employee;
}

export class Target implements TargetInterface {
  "date": Date;
  "target": any;
  "id": any;
  "employeeId": any;
  "createdAt": Date;
  "updatedAt": Date;
  employee: Employee;
  constructor(data?: TargetInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Target`.
   */
  public static getModelName() {
    return "Target";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Target for dynamic purposes.
  **/
  public static factory(data: TargetInterface): Target{
    return new Target(data);
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
      name: 'Target',
      plural: 'Targets',
      properties: {
        "date": {
          name: 'date',
          type: 'Date'
        },
        "target": {
          name: 'target',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "employeeId": {
          name: 'employeeId',
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
        employee: {
          name: 'employee',
          type: 'Employee',
          model: 'Employee'
        },
      }
    }
  }
}
