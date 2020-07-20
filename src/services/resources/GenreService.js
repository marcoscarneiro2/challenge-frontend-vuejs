import Rest from '@/services/Rest';

/**
 * @typedef {GenreService}
 */
export default class GenreService extends Rest {
  /**
   * @type {String}
   */
  static resource = '/genres'
}
