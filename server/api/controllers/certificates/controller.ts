import { Request, Response, NextFunction } from 'express';

import CertificatesService from '../../services/certificates.service';
import BlockchainService from '../../services/blockchain.service';

export class Controller {
  async issue(req: Request, res: Response, next: NextFunction) {
    try {
      const { document, ipfsHash } = await CertificatesService.issue(
        req.body.certificateData
      );
      const status = await BlockchainService.issue(
        document,
        ipfsHash,
        req.body.certificateData.student.id
      );
      res.status(200).json({ message: 'Successful', status });
    } catch (err) {
      next(err);
    }
  }

  async bulkIssue(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file)
        throw { message: 'Please upload a valid file', statusCode: 400 };
      const {
        documents,
        ipfsHashes,
        rolls,
      } = await CertificatesService.bulkIssue(req.file.originalname);

      const status = await BlockchainService.bulkIssue(
        documents,
        ipfsHashes,
        rolls
      );
      res.status(200).json({ message: 'Successful', status });
    } catch (err) {
      next(err);
    }
  }

  async fetchCertificate(req: Request, res: Response, next: NextFunction) {
    try {
      const ipfsHash = await BlockchainService.getCertificateByRoll(
        req.params.id
      );
      const certificate = await CertificatesService.getCertificateByIPFSHash(
        ipfsHash
      );
      res.status(200).json({ certificate, message: 'Successful' });
    } catch (err) {
      next(err);
    }
  }
}

export default new Controller();
