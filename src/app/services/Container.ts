/* tslint:disable */
import {Injectable, Inject, Optional, ErrorHandler} from '@angular/core';
import { Http, Response } from '@angular/http';
import {BaseLoopBackApi} from '../shared/sdk/services/core/base.service';
import {SocketConnection} from '../shared/sdk/sockets/socket.connections';
import {SDKModels} from '../shared/sdk/services/custom/SDKModels';
import {LoopBackAuth} from '../shared/sdk/services/core/auth.service';
import {JSONSearchParams} from '../shared/sdk/services/core/search.params';
import {Observable} from 'rxjs/Observable';
import {LoopBackConfig} from '../shared/sdk/lb.config';


/**
 * Api services for the `Container` model.
 */
@Injectable()
export class ContainerApi extends BaseLoopBackApi {

  constructor(
    @Inject(Http) protected http: Http,
    @Inject(SocketConnection) protected connection: SocketConnection,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http,  connection,  models, auth, searchParams, errorHandler);
  }

  /**
   * <em>
   * (The remote method definition does not provide any description.)
   * </em>
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Container` object.)
   * </em>
   */
  public getContainers(): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
      "/containers";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * <em>
   * (The remote method definition does not provide any description.)
   * </em>
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Container` object.)
   * </em>
   */
  public createContainer(options: any = {}): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
      "/containers";
    let _routeParams: any = {};
    let _postBody: any = {
      options: options
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * <em>
   * (The remote method definition does not provide any description.)
   * </em>
   *
   * @param {string} container
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `` – `{}` -
   */
  public destroyContainer(container: any = {}): Observable<any> {
    let _method: string = "DELETE";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
      "/containers/:container";
    let _routeParams: any = {
      container: container
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * <em>
   * (The remote method definition does not provide any description.)
   * </em>
   *
   * @param {string} container
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Container` object.)
   * </em>
   */
  public getContainer(container: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
      "/containers/:container";
    let _routeParams: any = {
      container: container
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * <em>
   * (The remote method definition does not provide any description.)
   * </em>
   *
   * @param {string} container
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Container` object.)
   * </em>
   */
  public getFiles(container: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
      "/containers/:container/files";
    let _routeParams: any = {
      container: container
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * <em>
   * (The remote method definition does not provide any description.)
   * </em>
   *
   * @param {string} container
   *
   * @param {string} file
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Container` object.)
   * </em>
   */
  public getFile(container: any = {}, file: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
      "/containers/:container/files/:file";
    let _routeParams: any = {
      container: container,
      file: file
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * <em>
   * (The remote method definition does not provide any description.)
   * </em>
   *
   * @param {string} container
   *
   * @param {string} file
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `` – `{}` -
   */
  public removeFile(container: any = {}, file: any = {}): Observable<any> {
    let _method: string = "DELETE";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
      "/containers/:container/files/:file";
    let _routeParams: any = {
      container: container,
      file: file
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * <em>
   * (The remote method definition does not provide any description.)
   * </em>
   *
   * @param {object} data Request data.
   *
   *  - `req` – `{object}` -
   *
   *  - `res` – `{object}` -
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `result` – `{object}` -
   */
  public upload(req: any = {}, res: any = {}): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
      "/containers/test/upload";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (req) _urlParams.req = req;
    if (res) _urlParams.res = res;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * <em>
   * (The remote method definition does not provide any description.)
   * </em>
   *
   * @param {string} container
   *
   * @param {string} file
   *
   * @param {object} req
   *
   * @param {object} res
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public download(container: any = {}, file: any = {}, req: any = {}, res: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
      "/containers/:container/download/:file";
    let _routeParams: any = {
      container: container,
      file: file
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (req) _urlParams.req = req;
    if (res) _urlParams.res = res;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * <em>
   * (The remote method definition does not provide any description.)
   * </em>
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `result` – `{any}` -
   */
  public myRemote(): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
      "/containers/my-remote";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Statistical information for container registers.
   *
   * @param {string} range hourly, daily, weekly, monthly, yearly, custom
   *
   * @param {object} custom {"start": date, "end": date }
   *
   * @param {object} where where filter
   *
   * @param {string} groupBy group by filter
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Container` object.)
   * </em>
   */
  public stats(range: any, custom: any = {}, where: any = {}, groupBy: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
      "/containers/stats";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (range) _urlParams.range = range;
    if (custom) _urlParams.custom = custom;
    if (where) _urlParams.where = where;
    if (groupBy) _urlParams.groupBy = groupBy;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Container`.
   */
  public getModelName() {
    return "Container";
  }
}
