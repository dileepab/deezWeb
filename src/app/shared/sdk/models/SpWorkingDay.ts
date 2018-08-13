/* tslint:disable */

declare var Object: any;
export interface SpWorkingDayInterface {
  "date"?: Date;
  "startTime"?: Date;
  "endTime"?: Date;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class SpWorkingDay implements SpWorkingDayInterface {
  "date": Date;
  "startTime": Date;
  "endTime": Date;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: SpWorkingDayInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SpWorkingDay`.
   */
  public static getModelName() {
    return "SpWorkingDay";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SpWorkingDay for dynamic purposes.
  **/
  public static factory(data: SpWorkingDayInterface): SpWorkingDay{
    return new SpWorkingDay(data);
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
      name: 'SpWorkingDay',
      plural: 'SpWorkingDays',
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
