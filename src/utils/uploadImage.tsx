import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1/";

const uploadImage = async (imageFile: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const uploadUrl = new URL("upload", baseURL).toString();
    const response = await axios.post(uploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    if (response.data.success) {
      return response.data.data.url;
    }
    return null;
  } catch (error) {
    console.error("Image upload failed", error);
    return null;
  }
};

export default uploadImage;
