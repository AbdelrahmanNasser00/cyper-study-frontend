import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
} from "../../../services/profileApi";

function ProfileDetails() {
  const { setProfileImage, setProfileData } = useOutletContext(); // Access setProfileData from context
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    bio: "",
    personalImg: null,
    previewImg: null,
  });
  const [formErrors, setFormErrors] = useState({});

  // Fetch profile data
  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [updateProfilePicture] = useUpdateProfilePictureMutation();

  // Populate form data when profile is fetched
  useEffect(() => {
    if (profile) {
      setFormData({
        firstname: profile.firstname || "",
        lastname: profile.lastname || "",
        email: profile.email || "",
        bio: profile.bio || "",
        personalImg: null,
        previewImg: profile.profilePicture || null,
      });
      setProfileImage(profile.profilePicture || null); // Set initial profile image
      setProfileData({
        name: `${profile.firstname} ${profile.lastname}`,
        email: profile.email,
        role: profile.role || "User", // Default role if not provided
      }); // Set name, email, and role for the sidebar
    }
  }, [profile, setProfileImage, setProfileData]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        personalImg: file,
        previewImg: previewUrl,
      }));
    }
  }

  function validateForm() {
    const errors = {};
    if (!formData.firstname.trim())
      errors.firstname = "First name is required.";
    if (!formData.lastname.trim()) errors.lastname = "Last name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Valid email is required.";
    if (!formData.bio.trim()) errors.bio = "Bio is required.";
    return errors;
  }

  async function handleSave(e) {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // Update profile data
      await updateProfile({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        bio: formData.bio,
      }).unwrap();

      // Update profile picture if a new image is selected
      if (formData.personalImg) {
        const response = await updateProfilePicture(
          formData.personalImg
        ).unwrap();
        setProfileImage(response.imageUrl); // Immediately update the ProfileSideBar image
        setFormData((prevData) => ({
          ...prevData,
          previewImg: response.imageUrl, // Update the preview image
        }));
      }

      setFormErrors({});
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  function handleCancel() {
    setIsOpen(false);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-5 border-2 border-gray-100 rounded-2xl">
      <h3 className="text-2xl font-semibold">Profile Information</h3>
      {isOpen ? (
        <form onSubmit={handleSave} className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-500">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded"
            />
            {formErrors.firstname && (
              <p className="text-red-500 text-sm">{formErrors.firstname}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-500">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded"
            />
            {formErrors.lastname && (
              <p className="text-red-500 text-sm">{formErrors.lastname}</p>
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
          <div>
            <label className="text-sm font-semibold text-gray-500">
              Personal Image
            </label>
            <input
              type="file"
              name="personalImg"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-1 p-2 border rounded"
            />
            {formData.previewImg && (
              <img
                src={formData.previewImg}
                alt="Preview"
                className="w-20 h-20 mt-2 rounded-full"
              />
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
            <h6 className="text-sm font-semibold text-gray-500">First Name</h6>
            <p className="text-lg font-medium">{formData.firstname}</p>
          </div>
          <div>
            <h6 className="text-sm font-semibold text-gray-500">Last Name</h6>
            <p className="text-lg font-medium">{formData.lastname}</p>
          </div>
          <div>
            <h6 className="text-sm font-semibold text-gray-500">Email</h6>
            <p className="text-lg font-medium">{formData.email}</p>
          </div>
          <div>
            <h6 className="text-sm font-semibold text-gray-500">Bio</h6>
            <p className="text-lg font-medium">{formData.bio}</p>
          </div>
          <div>
            <h6 className="text-sm font-semibold text-gray-500">
              Personal Image
            </h6>
            {formData.previewImg ? (
              <img
                src={formData.previewImg}
                alt="Personal"
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <p className="text-gray-500">No image uploaded</p>
            )}
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
