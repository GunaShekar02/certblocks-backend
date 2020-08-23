const ipfs = require('nano-ipfs-store').at('https://ipfs.infura.io:5001');
import OpenCert from '@govtechsg/open-certificate';
import csv from 'csvtojson';

import l from '../../common/logger';

import degreeSchema from '../../schemas/degree.schema.json';
import { staticData } from '../../common/utils/staticData';
import ICertificateData from '../../interfaces/ICertificateData';

class CertificatesService {
  async issue(certificateData: ICertificateData) {
    const certificate = await OpenCert.issueCertificate(
      {
        ...staticData,
        student: certificateData.student,
        issuedOn: new Date().toISOString(),
        content: `for completing his/her degree with a CGPA of ${certificateData.cgpa}`,
      },
      degreeSchema
    );

    const stringifiedCert = JSON.stringify(certificate);
    const cid = await ipfs.add(stringifiedCert);

    return {
      document: certificate.signature.targetHash,
      ipfsHash: cid,
    };
  }

  async bulkIssue(file: string) {
    const certificateData = await csv().fromFile(
      __dirname + `/../../../public/csvs/${file}`
    );

    const certificates = await OpenCert.issueCertificates(
      certificateData.map((item) => ({
        ...staticData,
        student: item.student,
        issuedOn: new Date().toISOString(),
        content: `for completing his/her degree with a CGPA of ${item.cgpa}`,
      })),
      degreeSchema
    );

    const cidPromises = certificates.map((item) =>
      ipfs.add(JSON.stringify(item))
    );

    const ipfsHashes: string[] = await Promise.all(cidPromises);

    const documents = certificates.map((item) => item.signature.targetHash);

    const rolls = certificateData.map((item) => item.student.id);

    return { documents, ipfsHashes, rolls };
  }

  async getCertificateByIPFSHash(ipfsHash: string) {
    const certificate = await ipfs.cat(ipfsHash);

    return certificate;
  }
}

export default new CertificatesService();
