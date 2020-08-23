import * as express from 'express';
import multer from 'multer';

import controller from './controller';
import hasAPIKey from '../../middlewares/hasAPIKey';

const fileFilter = (_, file, callback) => {
  if (!file.originalname.match(/\.(csv)$/))
    return callback(new Error('Please upload a valid .csv file'), false);
  else return callback(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + `/../../../../public/csvs`);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default express
  .Router()
  .post('/issue', hasAPIKey, controller.issue)
  .post(
    '/bulkissue',
    hasAPIKey,
    upload.single('studentList'),
    controller.bulkIssue
  )
  .post('/verify', controller.verifyCertificate)
  .get('/:id', controller.fetchCertificate);
