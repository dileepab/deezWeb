/* tslint:disable */

declare var Object: any;
export interface PatternInterface {
  "name": string;
  "imgLink"?: string;
  "imgId"?: string;
  "thumbnailLink"?: string;
  "desc"?: string;
  "isActive"?: boolean;
  "operations"?: any;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Pattern implements PatternInterface {
  "name": string;
  "imgLink": string;
  "imgId": string;
  "thumbnailLink": string;
  "desc": string;
  "isActive": boolean;
  "operations": any;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: PatternInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Pattern`.
   */
  public static getModelName() {
    return "Pattern";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Pattern for dynamic purposes.
  **/
  public static factory(data: PatternInterface): Pattern{
    return new Pattern(data);
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
      name: 'Pattern',
      plural: 'Patterns',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "imgLink": {
          name: 'imgLink',
          type: 'string'
        },
        "imgId": {
          name: 'imgId',
          type: 'string'
        },
        "thumbnailLink": {
          name: 'thumbnailLink',
          type: 'string'
        },
        "desc": {
          name: 'desc',
          type: 'string'
        },
        "isActive": {
          name: 'isActive',
          type: 'boolean',
          default: true
        },
        "operations": {
          name: 'operations',
          type: 'any'
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
