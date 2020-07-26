const ipfs = require('nano-ipfs-store').at('https://ipfs.infura.io:5001');
import OpenCert from '@govtechsg/open-certificate';

import l from '../../common/logger';

import degreeSchema from '../../schemas/degree.schema.json';
import ICertificateData from '../../interfaces/ICertificateData';

class CertificatesService {
  async issue(certificateData: ICertificateData, studentId: string) {
    const certificate = await OpenCert.issueCertificate(
      certificateData,
      degreeSchema
    );
    console.log(certificate);

    const stringifiedCert = JSON.stringify(certificate);
    l.info('PUSHING CERT TO IPFS');
    const cid = await ipfs.add(stringifiedCert);

    console.log('IPFS cid:', cid);

    console.log(await ipfs.cat(cid));
  }
}

export default new CertificatesService();
