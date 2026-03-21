import axios from "axios";

const uploadImage = async (imageFile: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axios.post("http://localhost:5000/api/v1/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
