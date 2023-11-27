import CertificateCard from '../certificate-card/certificate-card';

type Certificate = {
  webp: string;
  image: {
    src: string;
    highResolution: string;
  };
  alt: string;
}

type CertificateListProps = {
  certificates: Certificate[];
}

function CertificateList({ certificates }: CertificateListProps): JSX.Element {
  return (
    <ul className="personal-account-coach__list">
      {certificates.map((certificate) => (
        <CertificateCard key={certificate.alt} certificate={certificate} description={certificate.alt} />
      ))}
    </ul>
  );
}

export default CertificateList;
