const ProfilePage = () => {
  return (
    <section className="p-4">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-[#044635]">My Profile</h1>

      {/* Profile Header */}
      <div className="mt-6 flex items-center gap-6 rounded-xl bg-white px-10 py-6">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"
          alt="Profile"
          className="h-28 w-28 rounded-full object-cover"
        />

        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-[#044635]">
            Md Souad Al Kabir
          </h2>
          <p className="text-sm text-gray-600">Admin</p>
          <p className="text-sm text-gray-500">Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mt-10 rounded-xl bg-white px-10 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#044635]">
            Personal Information
          </h2>
          <button className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
            Edit
          </button>
        </div>

        <hr className="border border-gray-100" />

        {/* Info Grid */}
        <div className="mt-8 max-w-4xl space-y-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">First Name</p>
              <p className="font-medium">Md Souad</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="font-medium">Al Kabir</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">12-12-2026</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">souadalkabir@gmail.com</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">+8801830807523</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">User Role</p>
              <p className="font-medium">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mt-10 rounded-xl bg-white px-10 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#044635]">Address</h2>
          <button className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
            Edit
          </button>
        </div>

        <hr className="border border-gray-100" />

        {/* Info Grid */}
        <div className="mt-8 max-w-4xl space-y-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Country</p>
              <p className="font-medium">Bangladesh</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">City</p>
              <p className="font-medium">Dhaka</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Postal code</p>
              <p className="font-medium">1229</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
