import { useState } from "react";

const useFileUpload = () => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const files = Array.from(event.target.files);
        const validFile = files.find((file) =>
            ["image/", "video/"].some((type) => file.type.startsWith(type))
        );

        if (!validFile) {
            setErrorMessage("Only images and videos are allowed.");
            return;
        }

        setUploadedFile(validFile);
        setErrorMessage(null);
    };

    return { uploadedFile, errorMessage, handleFileChange };
};

export default useFileUpload;
