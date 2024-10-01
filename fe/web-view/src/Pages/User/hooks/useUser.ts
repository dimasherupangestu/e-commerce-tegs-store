import { useState, useEffect, useRef } from "react";
import useAuthStore from "../../../store/useAuthStore";
import { APIWithToken } from "../../../libs/axios";
import { toast } from "react-toastify";

interface UpdateUserRequest {
  full_name?: string;
  password?: string;
  phone_number?: string | number;
  photo_profile?: string | File;
  street?: string;
  city?: string;
  country?: string;
  province?: string;
  postal_code?: string;
  email?: string;
}

const useEditProfile = () => {
  const { user, setUser } = useAuthStore();
  const [data, setData] = useState<UpdateUserRequest>({
    full_name: user?.full_name,
    phone_number: user?.phone_number,
    photo_profile: user?.photo_profile,
    street: user?.street,
    city: user?.city,
    country: user?.country,
    province: user?.province,
    postal_code: user?.postal_code,
    email: user?.email,
  });

  useEffect(() => {
    setData({
      full_name: user?.full_name,
      phone_number: user?.phone_number,
      photo_profile: user?.photo_profile,
      street: user?.street,
      city: user?.city,
      country: user?.country,
      province: user?.province,
      postal_code: user?.postal_code,
      email: user?.email,
    });
  }, [user]);

  const photo_profile_ref = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (files) {
      setData((prevData) => ({
        ...prevData,
        [name]: files[0]
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleEditProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("full_name", data.full_name as string);
      formData.append("phone_number", data.phone_number as string);
      formData.append("photo_profile", data.photo_profile as File);
      formData.append("street", data.street as string);
      formData.append("city", data.city as string);
      formData.append("country", data.country as string);
      formData.append("province", data.province as string);
      formData.append("postal_code", data.postal_code as string);
      formData.append("email", data.email as string);

      const response = await APIWithToken.patch("/users/current", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
    //   console.log(response);
      setUser(response.data.data);
      toast.success("Profile updated successfully");
      return response;
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  
  

  return {
    data,
    handleChange,
    handleEditProfile,
    photo_profile_ref,
  };
};

export default useEditProfile;
