import Http from '@/services/Http';

/**
 * @type Api
 */
export default class Api extends Http {
  /**
   * @type {String}
   */
  static base = 'https://vue-flix-backend.herokuapp.com';

  /**
   * @param {String} path
   * @param {Object} options
   * @param {Object} http
   * @return {this}
   */
  static build(path = '', options = {}, http = null) {
    return new this(Api.normalize(Api.base, path), options, http);
  }
}
