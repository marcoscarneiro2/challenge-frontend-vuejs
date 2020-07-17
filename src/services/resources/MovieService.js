import Rest from '@/services/Rest';

/**
 * @typedef {MovieService}
 */
export default class MovieService extends Rest {
  /**
   * @type {String}
   */
  static resource = '/movie/search/1'
}
