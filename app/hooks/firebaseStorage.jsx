import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { STORAGE } from "@/app/firebaseConfig";
import toast from "react-hot-toast";

const useFirebaseStorage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const uploadImage = async (file, customPath) => {
    const storageRef = ref(STORAGE, customPath + "/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        toast.promise(
          uploadTask,
          {
            loading: `Uploading payment proof...`,
            success: `Uploaded payment proof!`,
            error: `Error uploading payment proof. Please try again.`,
          },
          {
            id: file.name,
            progress: { type: "percent" },
          }
        );
      },
      (err) => {
        toast.error(`Error uploading payment proof. Please try again.`, {
          id: file.name,
        });
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(storageRef);
          setImageUrl(downloadURL);
          toast.success(`Payment proof uploaded successfully!`, { id: file.name });
        } catch (error) {
          toast.error(`Error uploading payment proof. Please try again.`, {
            id: file.name,
          });
        }
      }
    );
  };

  return { imageUrl, uploadImage };
};

export default useFirebaseStorage;