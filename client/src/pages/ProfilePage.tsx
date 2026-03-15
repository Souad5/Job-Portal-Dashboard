import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import SecondaryButton from "../components/ui/SecondaryButton";
import { Modal } from "../components/ui/Modal";
import Input from "../components/ui/Input";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL, IMGBB_API_KEY } from "@/config"; // IMGBB_API_KEY required
import Loading from "@/components/ui/Loading";

type ProfileForm = {
  name: string;
  email: string;
  role: string;
  dateOfBirth: string;
  country: string;
  city: string;
  postalCode: string;
  phone: string;
  profilePic?: string;
};

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileForm | null>(null);
  const [profilePic, setProfilePic] = useState<string>("");

  const user = JSON.parse(localStorage.getItem("recruiter") || "{}");

  const methods = useForm<ProfileForm>({
    defaultValues: profile || {
      name: "",
      email: "",
      role: "",
      dateOfBirth: "",
      country: "",
      city: "",
      postalCode: "",
      phone: "",
      profilePic: "",
    },
  });

  /* ---------------- Fetch Profile ---------------- */
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?._id) return;
      try {
        const res = await axios.get(
          `${API_BASE_URL}/admin/recruiter/${user._id}`,
        );
        setProfile(res.data);
        setProfilePic(res.data.profilePic || "");
        methods.reset(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, [methods, user._id]);

  /* ---------------- Upload image to ImgBB ---------------- */
  const handleProfileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData,
      );
      const url = res.data.data.url as string;
      setProfilePic(url);
      toast.success("Image uploaded!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    }
  };

  /* ---------------- Update Profile ---------------- */
  const onSubmit = async (data: ProfileForm) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/admin/recruiter/${user._id}/profile`,
        { ...data, profilePic },
      );
      setProfile(res.data);
      localStorage.setItem("recruiter", JSON.stringify(res.data));
      toast.success("Profile updated");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  if (!profile)
    return (
      <div className="text-center mt-20">
        <Loading />
      </div>
    );

  return (
    <section className="px-4 py-6 min-h-screen bg-white dark:bg-slate-900 transition-colors duration-500">
      <h1 className="md:text-3xl text-xl font-semibold text-[#044635] dark:text-[#0af0b4]">
        My Profile
      </h1>

      {/* Header */}
      <div className="mt-6 flex flex-col md:flex-row items-center md:items-start gap-6 rounded-xl bg-white dark:bg-slate-800 px-6 md:px-10 py-6 ring-1 ring-blue-200 dark:ring-slate-700">
        <div className="flex flex-col items-center md:items-start gap-3">
          <img
            src={
              profilePic || `https://ui-avatars.com/api/?name=${profile.name}`
            }
            alt="Profile"
            className="h-28 w-28 rounded-full object-cover border"
          />
          <h2 className="text-xl font-semibold text-[#044635] dark:text-[#0af0b4]">
            {profile.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {profile.role}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-200">
            {profile.city}, {profile.country}
          </p>
        </div>
        <div className="ml-auto">
          <Button value="Edit Profile" onClick={() => setOpen(true)} />
        </div>
      </div>

      {/* Personal Info */}
      <div className="mt-10 rounded-xl bg-white dark:bg-slate-800 px-6 md:px-10 py-6 ring-1 ring-blue-200 dark:ring-slate-700">
        <h2 className="text-lg font-semibold mb-6 text-[#044635] dark:text-[#0af0b4]">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Info label="Name" value={profile.name} />
          <Info label="Email" value={profile.email} />
          <Info label="Phone" value={profile.phone} />
          <Info label="Date of Birth" value={profile.dateOfBirth} />
          <Info label="Role" value={profile.role} />
        </div>
      </div>

      {/* Address */}
      <div className="mt-10 rounded-xl bg-white dark:bg-slate-800 px-6 md:px-10 py-6 ring-1 ring-blue-200 dark:ring-slate-700">
        <h2 className="text-lg font-semibold mb-6 text-[#044635] dark:text-[#0af0b4]">
          Address
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Info label="Country" value={profile.country} />
          <Info label="City" value={profile.city} />
          <Info label="Postal Code" value={profile.postalCode} />
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Edit Profile"
        description="Update your personal information"
      >
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-4 px-4 py-6"
          >
            <div className="flex flex-col items-center gap-2">
              <img
                src={
                  profilePic ||
                  `https://ui-avatars.com/api/?name=${profile.name}`
                }
                className="h-24 w-24 rounded-full object-cover"
              />
              <label className="cursor-pointer text-sm text-blue-600 hover:underline">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleProfileUpload}
                />
              </label>
            </div>
            <Input name="name" label="Name" />
            <Input name="email" label="Email" disabled />
            <Input name="phone" label="Phone" />
            <Input name="dateOfBirth" label="Date of Birth" type="date" />
            <Input name="country" label="Country" />
            <Input name="city" label="City" />
            <Input name="postalCode" label="Postal Code" />
            <Input name="role" label="Role" disabled />

            <div className="flex justify-end gap-3 mt-4">
              <SecondaryButton
                type="button"
                value="Cancel"
                onClick={() => setOpen(false)}
              />
              <Button value="Save Changes" type="submit" />
            </div>
          </form>
        </FormProvider>
      </Modal>
    </section>
  );
};

const Info = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-sm text-gray-500 dark:text-gray-200">{label}</p>
    <p className="font-medium">{value || "—"}</p>
  </div>
);

export default ProfilePage;
