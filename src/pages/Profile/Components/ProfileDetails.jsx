import { useState } from "react";

function ProfileDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "abdo",
    email: "aa33631@gmail.com",
    location: "asyut,Egypt",
    phone: "01004689041",
    bio: "this bio for test purpose",
  });
  const [formErrors, setFormErrors] = useState({});

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function validateForm() {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Valid email is required.";
    if (!formData.location.trim()) errors.location = "Location is required.";
    if (!formData.phone.trim() || !/^\d{10,15}$/.test(formData.phone))
      errors.phone = "Valid phone number is required.";
    if (!formData.bio.trim()) errors.bio = "Bio is required.";
    return errors;
  }

  function handleSave(e) {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setIsOpen(false);
  }

  function handleCancel() {
    setIsOpen(false);
  }

  return (
    <div className="p-5 border-2 border-gray-100 rounded-2xl">
      <h3 className="text-2xl font-semibold">Profile Information</h3>
      {isOpen ? (
        <form onSubmit={handleSave} className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-500">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-500">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-500">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded"
            />
            {formErrors.location && (
              <p className="text-red-500 text-sm">{formErrors.location}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-500">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded"
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm">{formErrors.phone}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-500">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded"
            />
            {formErrors.bio && (
              <p className="text-red-500 text-sm">{formErrors.bio}</p>
            )}
          </div>
          <div className="mt-5 text-right space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-gray-500 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-5 space-y-4">
          <div>
            <h6 className="text-sm font-semibold text-gray-500">Name</h6>
            <p className="text-lg font-medium">{formData.name}</p>
          </div>
          <div>
            <h6 className="text-sm font-semibold text-gray-500">Email</h6>
            <p className="text-lg font-medium">{formData.email}</p>
          </div>
          <div>
            <h6 className="text-sm font-semibold text-gray-500">Location</h6>
            <p className="text-lg font-medium">{formData.location}</p>
          </div>
          <div>
            <h6 className="text-sm font-semibold text-gray-500">Phone</h6>
            <p className="text-lg font-medium">{formData.phone}</p>
          </div>
          <div>
            <h6 className="text-sm font-semibold text-gray-500">Website</h6>
            <p className="text-lg font-medium">{formData.website}</p>
          </div>
          <div>
            <h6 className="text-sm font-semibold text-gray-500">Bio</h6>
            <p className="text-lg font-medium">{formData.bio}</p>
          </div>
          <div className="mt-5 text-right">
            <button
              onClick={() => setIsOpen(true)}
              className="text-blue-500 font-medium hover:underline cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDetails;
