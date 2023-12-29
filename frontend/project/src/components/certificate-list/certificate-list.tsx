import CertificateCard from '../certificate-card/certificate-card';

type CertificateListProps = {
  certificates: string[];
}

function CertificateList({ certificates }: CertificateListProps): JSX.Element {
  return (
    <ul className="personal-account-coach__list">
      {certificates.map((certificate, index) => (
        <CertificateCard key={`${certificate}-${index}`} certificate={certificate}/>
      ))}
    </ul>
  );
}

export default CertificateList;
