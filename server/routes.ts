import { Application } from 'express';

import examplesRouter from './api/controllers/examples/router';
import authRouter from './api/controllers/auth/router';
import certificatesRouter from './api/controllers/certificates/router';

export default function routes(app: Application): void {
  app.use('/auth', authRouter);
  app.use('/certificates', certificatesRouter);
  app.use('/api/v1/examples', examplesRouter);
}
