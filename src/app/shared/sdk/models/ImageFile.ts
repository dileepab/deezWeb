/* tslint:disable */

declare var Object: any;
export interface ImageFileInterface {
  "name"?: string;
  "container"?: string;
  "type"?: string;
  "size"?: number;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class ImageFile implements ImageFileInterface {
  "name": string;
  "container": string;
  "type": string;
  "size": number;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: ImageFileInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ImageFile`.
   */
  public static getModelName() {
    return "ImageFile";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ImageFile for dynamic purposes.
  **/
  public static factory(data: ImageFileInterface): ImageFile{
    return new ImageFile(data);
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
      name: 'ImageFile',
      plural: 'ImageFiles',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "container": {
          name: 'container',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "size": {
          name: 'size',
          type: 'number'
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
