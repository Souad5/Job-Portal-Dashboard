import { useState } from "react";
import Button from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import Input from "../components/ui/Input";
import { FormProvider, useForm } from "react-hook-form";
import SecondaryButton from "../components/ui/SecondaryButton";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);

  const methods = useForm({
    defaultValues: {
      firstName: "Md Souad",
      lastName: "Al Kabir",
      email: "souadalkabir@gmail.com",
      role: "Admin",
      country: "Bangladesh",
      city: "Dhaka",
      postalCode: "1229",
    },
  });

  return (
    <section className="px-4 py-6 min-h-screen bg-white dark:bg-slate-900 transition-colors duration-500 ease-in-out">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-[#044635] dark:text-[#0af0b4]">
        My Profile
      </h1>

      {/* Profile Header */}
      <div className="mt-6 flex items-center gap-6 rounded-xl bg-white dark:bg-slate-800 px-10 py-6 ring-1 ring-blue-200">
        <div className="flex justify-between items-start gap-2 w-full">
          <div className="space-y-1">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"
              alt="Profile"
              className="h-28 w-28 rounded-full object-cover"
            />
            <h2 className="text-xl font-semibold text-[#044635] dark:text-[#0af0b4]">
              Md Souad Al Kabir
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Admin</p>
            <p className="text-sm text-gray-500 dark:text-gray-200">
              Dhaka, Bangladesh
            </p>
          </div>
          <div>
            <Button value="Edit" onClick={() => setOpen(true)}></Button>
          </div>
          <Modal
            open={open}
            onOpenChange={setOpen} // use onOpenChange, not setOpen
            title="Edit Profile"
            description="Update your personal information"
          >
            {/* Form content */}
            {/* Wrap the modal form in FormProvider */}
            <FormProvider {...methods}>
              <form className="space-y-4">
                <Input name="firstName" label="First Name" />
                <Input name="lastName" label="Last Name" />
                <Input name="email" label="Email" />
                <Input name="Date of Birth" type="date" label="Date of Birth" />
                <Input name="role" label="Role" disabled />
                <Input name="country" label="Address" />
                <Input name="city" label="City" />
                <Input name="postalCode" label="Postal Code" />

                <div className="flex justify-end gap-2 mt-4">
                  <SecondaryButton
                    type="button"
                    onClick={() => setOpen(false)}
                    value="Cancel"
                  ></SecondaryButton>
                  <Button
                    value="Save Change"
                    type="submit"
                    onClick={methods.handleSubmit((data) => console.log(data))}
                  ></Button>
                </div>
              </form>
            </FormProvider>
          </Modal>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mt-10 rounded-xl bg-white dark:bg-slate-800 px-10 py-6 ring-1 ring-blue-200">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#044635] dark:text-[#0af0b4]">
            Personal Information
          </h2>
        </div>

        <hr className="border border-gray-100" />

        {/* Info Grid */}
        <div className="mt-8 max-w-4xl space-y-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
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
      </div>

      {/* Personal Information */}
      <div className="mt-10 rounded-xl bg-white dark:bg-slate-800 px-10 py-6 ring-1 ring-blue-200">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#044635] dark:text-[#0af0b4]">
            Address
          </h2>
        </div>

        <hr className="border border-gray-100" />

        {/* Info Grid */}
        <div className="mt-8 max-w-4xl space-y-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-200">
                Country
              </p>
              <p className="font-medium">Bangladesh</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-200">City</p>
              <p className="font-medium">Dhaka</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-200">
                Postal code
              </p>
              <p className="font-medium">1229</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
