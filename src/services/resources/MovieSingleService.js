import Rest from '@/services/Rest';

/**
 * @typedef {MovieSingleService}
 */
export default class MovieSingleService extends Rest {
  /**
   * @type {String}
   */
  static resource = '/media/movie'
}
