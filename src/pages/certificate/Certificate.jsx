import React from "react";
import { useParams } from "react-router-dom";
import { useGetCertificateByIdQuery } from "@/services/certificateApi";

const Certificate = () => {
  const { id } = useParams();
  const {
    data: certificate,
    isLoading,
    isError,
  } = useGetCertificateByIdQuery(id);

  if (isLoading)
    return <div className="text-center py-20">Loading certificate...</div>;
  if (isError)
    return (
      <div className="text-center py-20 text-red-500">
        Error loading certificate
      </div>
    );
  if (!certificate)
    return <div className="text-center py-20">Certificate not found</div>;

  const formattedDate = new Date(certificate.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gold-500">
        {/* Certificate Header */}
        <div className="bg-blue-600 py-6 px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Certificate of Completion
          </h1>
          <p className="text-white opacity-90">This is to certify that</p>
        </div>

        {/* Certificate Body */}
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {certificate.User.firstname} {certificate.User.lastname}
          </h2>
          <p className="text-gray-600 mb-8">
            has successfully completed the course
          </p>

          <h3 className="text-2xl font-semibold text-blue-600 mb-4">
            {certificate.Course.title}
          </h3>

          <div className="flex justify-center mb-8">
            <img
              src={certificate.Course.thumbnail}
              alt={certificate.Course.title}
              className="h-40 object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="text-left">
              <p className="text-gray-500">Instructor</p>
              <p className="font-medium">
                {certificate.Course.instructor.firstname}{" "}
                {certificate.Course.instructor.lastname}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Date Completed</p>
              <p className="font-medium">{formattedDate}</p>
            </div>
          </div>
        </div>

        {/* Certificate Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Certificate ID</p>
              <p className="font-mono">{certificate.certificateCode}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                Verify at: example.com/verify
              </p>
              <p className="text-xs text-gray-400 mt-1">
                © {new Date().getFullYear()} Your Platform Name
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
          Print Certificate
        </button>
      </div>
    </div>
  );
};

export default Certificate;
