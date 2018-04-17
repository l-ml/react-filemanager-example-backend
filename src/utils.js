import { format } from 'date-fns';
import { DATE_FORMAT } from './constants';

/**
 * Returns file's data as JSON.
 * @param {string} filename - Name of file.
 * @param {Object} fileStats - Object from fs.statSync.
 * @returns {Object} File's data in JSON.
 */
const fileAsJSON = (filename, fileStats) => ({
  filename,
  size: fileStats.size,
  created: format(fileStats.birthtime, DATE_FORMAT),
  modified: format(fileStats.mtime, DATE_FORMAT),
});

export {
  fileAsJSON,
};
