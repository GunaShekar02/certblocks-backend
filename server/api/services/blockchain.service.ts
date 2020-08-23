const Web3 = require('web3');

import l from '../../common/logger';
import { abi, address } from '../../common/utils/contractData';
import { WEB3_PROVIDER, ACCOUNT_PRIVATE_KEY } from '../../common/config';

class BlockchainService {
  web3: typeof Web3;
  contract: any;

  constructor() {
    const web3 = new Web3(WEB3_PROVIDER);
    this.web3 = web3;
    this.contract = new web3.eth.Contract(abi, address);
  }

  async issue(document: string, ipfsHash: string, roll: string) {
    const encodedData = this.contract.methods
      .issue(`0x${document}`, ipfsHash, roll)
      .encodeABI();

    const status = this.signAndSendTransaction(encodedData);

    return status;
  }

  async bulkIssue(documents: string[], ipfsHashes: string[], rolls: string[]) {
    const hexDocuments = documents.map((item) => `0x${item}`);

    const encodedData = this.contract.methods
      .bulkIssue(hexDocuments, ipfsHashes, rolls)
      .encodeABI();

    const status = this.signAndSendTransaction(encodedData);

    return status;
  }

  async getCertificateByRoll(roll: string) {
    return await this.contract.methods.getIPFSHashByRollNumber(roll).call();
  }

  async verifyCertificate(document: string) {
    return await this.contract.methods.isIssued(`0x${document}`).call();
  }

  async signAndSendTransaction(encodedData) {
    //Sign transaction with private key
    const signedTransaction = await this.web3.eth.accounts.signTransaction(
      {
        to: address,
        data: encodedData,
        gas: 500000,
      },
      ACCOUNT_PRIVATE_KEY
    );
    const receipt = await this.web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );

    return receipt.status;
  }
}

export default new BlockchainService();
