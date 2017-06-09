/* tslint:disable */

declare var Object: any;
export interface HolidayInterface {
  "date": Date;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Holiday implements HolidayInterface {
  "date": Date;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: HolidayInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Holiday`.
   */
  public static getModelName() {
    return "Holiday";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Holiday for dynamic purposes.
  **/
  public static factory(data: HolidayInterface): Holiday{
    return new Holiday(data);
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
      name: 'Holiday',
      plural: 'Holidays',
      properties: {
        "date": {
          name: 'date',
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
