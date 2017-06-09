/* tslint:disable */

declare var Object: any;
export interface OverTimeInterface {
  "date": Date;
  "startTime": Date;
  "endTime": Date;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class OverTime implements OverTimeInterface {
  "date": Date;
  "startTime": Date;
  "endTime": Date;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: OverTimeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OverTime`.
   */
  public static getModelName() {
    return "OverTime";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OverTime for dynamic purposes.
  **/
  public static factory(data: OverTimeInterface): OverTime{
    return new OverTime(data);
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
      name: 'OverTime',
      plural: 'OverTimes',
      properties: {
        "date": {
          name: 'date',
          type: 'Date'
        },
        "startTime": {
          name: 'startTime',
          type: 'Date'
        },
        "endTime": {
          name: 'endTime',
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
      },
      relations: {
      }
    }
  }
}
