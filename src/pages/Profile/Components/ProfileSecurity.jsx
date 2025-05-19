import { Button } from "@/components/ui/button";

function ProfileSecurity() {
  return (
    <div className="p-5 border-2 border-gray-100 rounded-2xl">
      {/* text */}
      <div>
        <h3 className="text-2xl font-semibold">Security Settings</h3>
        <h5 className="text-gray-400">Manage your account security</h5>
      </div>
      <h4 className="my-5 text-lg font-semibold">Change Password</h4>
      <form>
        <div className="mb-5">
          <label htmlFor="password">current password :</label>
          <input
            id="password"
            type="text"
            className="border-2 mt-1 border-gray-200 block w-full p-2 rounded-lg"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="new_password">new password :</label>
          <input
            id="new_password"
            type="text"
            className="border-2 mt-1 border-gray-200 block w-full p-2 rounded-lg"
            placeholder="new your password"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="confirm_password">Confirm New Password :</label>
          <input
            id="confirm_password"
            type="text"
            className="border-2 mt-1 border-gray-200 block w-full p-2 rounded-lg"
            placeholder="confirm new your password"
          />
        </div>
        <Button className="bg-mainColor border-2 border-gray-50 hover:border-gray-300 hover:bg-white hover:border-2  hover:text-black  ">
          Update
        </Button>
      </form>
      {/* text */}
    </div>
  );
}

export default ProfileSecurity;
