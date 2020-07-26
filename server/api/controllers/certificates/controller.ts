import { Request, Response, NextFunction } from 'express';

import CertificatesService from '../../services/certificates.service';

export class Controller {
  async issue(req: Request, res: Response, next: NextFunction) {
    try {
      await CertificatesService.issue(
        req.body.certificateData,
        req.body.studentId
      );
      res.status(200).json({ message: 'Successful' });
    } catch (err) {
      next(err);
    }
  }
}

export default new Controller();
