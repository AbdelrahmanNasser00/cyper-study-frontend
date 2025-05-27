import CertificateCard from "./CertificateCard";
import { useGetMyCertificatesQuery } from "@/services/certificateApi";

function CertificateTab() {
  const { data: certificates = [], isLoading } = useGetMyCertificatesQuery();

  console.log(certificates);

  return (
    <div className="border-2 border-gray-100 rounded-lg p-5">
      <div className="mb-5">
        <h3 className="text-2xl font-bold">My Certificates</h3>
        <p className="text-gray-500">
          Certificates you've earned by completing courses
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-5">
        {isLoading
          ? "Loading..."
          : certificates.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
      </div>
    </div>
  );
}

export default CertificateTab;
