import * as express from 'express';
import controller from './controller';
import hasAPIKey from '../../middlewares/hasAPIKey';

export default express.Router().post('/login', hasAPIKey, controller.login);
