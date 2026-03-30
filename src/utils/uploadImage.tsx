import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1/";

const uploadImage = async (imageFile: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    // Normalize baseURL and ensure it doesn't cause segments replacement
    const cleanBaseURL = baseURL.endsWith("/") ? baseURL : `${baseURL}/`;
    const uploadUrl = `${cleanBaseURL}upload`;
    console.log("Current Upload URL:", uploadUrl);

    const response = await axios.post(uploadUrl, formData, {
      withCredentials: true,
    });

    if (response.data.success) {
      return response.data.data.url;
    }
    throw new Error(response.data.message || "Failed to upload image");
  } catch (error: any) {
    const errorMsg = error?.response?.data?.error || error?.response?.data?.message || error.message || "Image upload failed";
    console.error("Image upload failed", errorMsg);
    throw new Error(errorMsg);
  }
};

export default uploadImage;
