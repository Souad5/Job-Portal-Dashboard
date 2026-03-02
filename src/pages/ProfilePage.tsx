import { useState } from "react";
import Button from "../components/ui/Button";
import SecondaryButton from "../components/ui/SecondaryButton";
import { Modal } from "../components/ui/Modal";
import Input from "../components/ui/Input";
import { FormProvider, useForm } from "react-hook-form";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s",
  );

  const methods = useForm({
    defaultValues: {
      firstName: "Md Souad",
      lastName: "Al Kabir",
      email: "souadalkabir@gmail.com",
      role: "Admin",
      dateOfBirth: "2026-12-12",
      country: "Bangladesh",
      city: "Dhaka",
      postalCode: "1229",
      phone: "+8801830807523",
    },
  });

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) setProfilePic(event.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="px-4 py-6 min-h-screen bg-white dark:bg-slate-900 transition-colors duration-500 ease-in-out">
      {/* Page Title */}
      <h1 className="md:text-3xl text-xl font-semibold text-[#044635] dark:text-[#0af0b4]">
        My Profile
      </h1>

      {/* Profile Header */}
      <div className="mt-6 flex flex-col md:flex-row items-center md:items-start gap-6 rounded-xl bg-white dark:bg-slate-800 px-6 md:px-10 py-6 ring-1 ring-blue-200 dark:ring-slate-700 transition-colors">
        <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-auto">
          <img
            src={profilePic}
            alt="Profile"
            className="h-28 w-28 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
          />
          <h2 className="text-xl font-semibold text-[#044635] dark:text-[#0af0b4]">
            Md Souad Al Kabir
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Admin</p>
          <p className="text-sm text-gray-500 dark:text-gray-200">
            Dhaka, Bangladesh
          </p>
        </div>
        <div className="ml-auto mt-4 md:mt-0">
          <Button value="Edit" onClick={() => setOpen(true)} />
        </div>

        {/* Edit Modal */}
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Edit Profile"
          description="Update your personal information"
        >
          <FormProvider {...methods}>
            <form className="space-y-4 px-4 py-6">
              {/* Profile Upload */}
              <div className="flex flex-col items-center gap-2">
                <img
                  src={profilePic}
                  alt="Profile Preview"
                  className="h-24 w-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                />
                <label className="cursor-pointer text-sm text-blue-600 dark:text-sky-400 hover:underline">
                  Upload New Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileUpload}
                  />
                </label>
              </div>

              <Input name="firstName" label="First Name" />
              <Input name="lastName" label="Last Name" />
              <Input name="email" label="Email" />
              <Input name="dateOfBirth" label="Date of Birth" type="date" />
              <Input name="role" label="Role" disabled />
              <Input name="country" label="Country" />
              <Input name="city" label="City" />
              <Input name="postalCode" label="Postal Code" />
              <Input name="phone" label="Phone Number" />

              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                <SecondaryButton
                  type="button"
                  onClick={() => setOpen(false)}
                  value="Cancel"
                />
                <Button
                  value="Save Changes"
                  type="submit"
                  onClick={methods.handleSubmit((data) =>
                    console.log("Form Data:", data),
                  )}
                />
              </div>
            </form>
          </FormProvider>
        </Modal>
      </div>

      {/* Personal Information Section */}
      <div className="mt-10 rounded-xl bg-white dark:bg-slate-800 px-6 md:px-10 py-6 ring-1 ring-blue-200 dark:ring-slate-700 transition-colors">
        <h2 className="text-lg font-semibold text-[#044635] dark:text-[#0af0b4] mb-6">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-200">
              First Name
            </p>
            <p className="font-medium">Md Souad</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-200">
              Last Name
            </p>
            <p className="font-medium">Al Kabir</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-200">
              Date of Birth
            </p>
            <p className="font-medium">12-12-2026</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-200">Email</p>
            <p className="font-medium">souadalkabir@gmail.com</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-200">
              Phone Number
            </p>
            <p className="font-medium">+8801830807523</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-200">
              User Role
            </p>
            <p className="font-medium">Admin</p>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="mt-10 rounded-xl bg-white dark:bg-slate-800 px-6 md:px-10 py-6 ring-1 ring-blue-200 dark:ring-slate-700 transition-colors">
        <h2 className="text-lg font-semibold text-[#044635] dark:text-[#0af0b4] mb-6">
          Address
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-200">Country</p>
            <p className="font-medium">Bangladesh</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-200">City</p>
            <p className="font-medium">Dhaka</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-200">
              Postal Code
            </p>
            <p className="font-medium">1229</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
