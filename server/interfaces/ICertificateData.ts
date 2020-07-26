interface ICertificateData {
  id?: string;
  logo: string;
  heading: string;
  context: string;
  introduction: string;
  student: {
    name: string;
    id: string;
    email?: string;
    phone?: string;
  };
  content: string;
  ending: string;
  issuedOn: Date;
  issuers: Array<{
    name: string;
    certificateStore: string;
    email?: string;
    phone?: string;
    url?: string;
  }>;
  signature: {
    name: string;
    position: string;
    image: string;
  };
}

export default ICertificateData;
