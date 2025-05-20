import { Button } from "@/components/ui/button";
import { useState } from "react";

function ProfileSecurity() {
  const [password, setPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};

    if (!password) {
      newErrors.password = "Current password is required.";
    }
    if (!newPassword) {
      newErrors.newPassword = "New password is required.";
    }
    if (!confirmNewPassword) {
      newErrors.confirmNewPassword = "Please confirm your new password.";
    } else if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully");
      // Add logic to handle form submission (e.g., API call)
    }
  }

  return (
    <div className="p-5 border-2 border-gray-100 rounded-2xl">
      {/* text */}
      <div>
        <h3 className="text-2xl font-semibold">Security Settings</h3>
        <h5 className="text-gray-400">Manage your account security</h5>
      </div>
      <h4 className="my-5 text-lg font-semibold">Change Password</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="password">Current Password:</label>
          <input
            id="password"
            type="text"
            className="border-2 mt-1 border-gray-200 block w-full p-2 rounded-lg"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="new_password">New Password:</label>
          <input
            id="new_password"
            type="text"
            className="border-2 mt-1 border-gray-200 block w-full p-2 rounded-lg"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setnewPassword(e.target.value)}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="confirm_password">Confirm New Password:</label>
          <input
            id="confirm_password"
            type="text"
            className="border-2 mt-1 border-gray-200 block w-full p-2 rounded-lg"
            placeholder="Confirm your new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmNewPassword}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="bg-mainColor border-2 border-gray-50 hover:border-gray-300 hover:bg-white hover:border-2 hover:text-black"
        >
          Update
        </Button>
      </form>
      {/* text */}
    </div>
  );
}

export default ProfileSecurity;
