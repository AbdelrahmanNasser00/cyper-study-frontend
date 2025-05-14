import React from "react";

const TipsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-blue-50 p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Quick Tips</h3>
        <ul className="text-sm list-disc list-inside text-gray-700 space-y-1">
          <li>Check your course analytics regularly</li>
          <li>Respond to student reviews promptly</li>
          <li>Update your course content to keep it fresh</li>
          <li>Use the earnings page to track your revenue</li>
        </ul>
      </div>

      <div className="bg-green-50 p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Get Started</h3>
        <ul className="text-sm list-disc list-inside text-gray-700 space-y-1">
          <li>Create a new course from the Courses section</li>
          <li>Update your instructor profile information</li>
          <li>Review student feedback and questions</li>
          <li>Set up payout methods in the Earnings section</li>
        </ul>
      </div>
    </div>
  );
};

export default TipsSection;
