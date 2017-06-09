/* tslint:disable */

declare var Object: any;
export interface CutInterface {
  "noOfYards": number;
  "yardPrice": number;
  "noOfPieces": number;
  "otherMaterials": any;
  "piecePrice": number;
  "patternNo"?: string;
  "customer"?: any;
  "deliverDate"?: Date;
  "date": Date;
  "note"?: string;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Cut implements CutInterface {
  "noOfYards": number;
  "yardPrice": number;
  "noOfPieces": number;
  "otherMaterials": any;
  "piecePrice": number;
  "patternNo": string;
  "customer": any;
  "deliverDate": Date;
  "date": Date;
  "note": string;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: CutInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Cut`.
   */
  public static getModelName() {
    return "Cut";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Cut for dynamic purposes.
  **/
  public static factory(data: CutInterface): Cut{
    return new Cut(data);
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
      name: 'Cut',
      plural: 'Cuts',
      properties: {
        "noOfYards": {
          name: 'noOfYards',
          type: 'number'
        },
        "yardPrice": {
          name: 'yardPrice',
          type: 'number'
        },
        "noOfPieces": {
          name: 'noOfPieces',
          type: 'number'
        },
        "otherMaterials": {
          name: 'otherMaterials',
          type: 'any'
        },
        "piecePrice": {
          name: 'piecePrice',
          type: 'number'
        },
        "patternNo": {
          name: 'patternNo',
          type: 'string'
        },
        "customer": {
          name: 'customer',
          type: 'any'
        },
        "deliverDate": {
          name: 'deliverDate',
          type: 'Date'
        },
        "date": {
          name: 'date',
          type: 'Date'
        },
        "note": {
          name: 'note',
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
      }
    }
  }
}
