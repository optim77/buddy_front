import { useState } from 'react';
import { showBanner } from "../../banner/BannerUtils";

interface useFileUploadProps {
    uploadedFile: File | null;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useFileUpload = (): useFileUploadProps => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const files = Array.from(event.target.files);
        const validFile = files.find((file) =>
            ['image/', 'video/'].some((type) => file.type.startsWith(type)),
        );

        if (!validFile) {
            showBanner('Only images and videos are allowed.', 'error')
            return;
        }

        setUploadedFile(validFile);
    };

    return { uploadedFile, handleFileChange };
};

export default useFileUpload;
