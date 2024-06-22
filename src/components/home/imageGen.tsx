import { useState, useRef, useEffect } from 'react';
import { handleFileUpload } from './imageUploadUtils';

export const ImageGen = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState("Living Room");
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [jobId, setJobId] = useState<string | null>(null);
    const [beforeImage, setBeforeImage] = useState("/images/before2.jpg");
    const [afterImages, setAfterImages] = useState<string[]>(["/images/after2.png"]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleRoomSelect = (room: string) => {
        setSelectedRoom(room);
        setIsDropdownOpen(false);
    };

    const handleUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsGenerating(true);
            setError(null);
            handleFileUpload(
                file,
                selectedRoom,
                (data) => {
                    console.log('Job submitted successfully:', data);
                    setUploadedImage(URL.createObjectURL(file));
                    setBeforeImage(URL.createObjectURL(file));
                    setJobId(data.id);
                },
                (errorMessage) => {
                    console.error(errorMessage);
                    setError(errorMessage);
                    setIsGenerating(false);
                }
            );
        }
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const checkStatus = async () => {
            if (jobId) {
                try {
                    const response = await fetch('https://thaara-qirai.ondigitalocean.app/status', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: jobId
                        })
                    });
                    const data = await response.json();
                    console.log(data);

                    if (data.status === "COMPLETED") {
                        setIsGenerating(false);
                        const base64Images = data.output;
                        setAfterImages(base64Images.map((img: string) => 'data:image/jpeg;base64,' + `${img}`));
                        setCurrentImageIndex(0);
                        setShowConfetti(true);
                        clearInterval(intervalId);
                        console.log(data);
                    }
                } catch (error) {
                    console.error('Error checking job status:', error);
                    setError('Error checking job status. Please try again.');
                    setIsGenerating(false);
                    clearInterval(intervalId);
                }
            }
        };

        if (isGenerating && jobId) {
            intervalId = setInterval(checkStatus, 5000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isGenerating, jobId]);

    useEffect(() => {
        if (showConfetti) {
            const timer = setTimeout(() => setShowConfetti(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showConfetti]);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % afterImages.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + afterImages.length) % afterImages.length);
    };

    const handleCloseErrorDialog = () => {
        setError(null);
    };

    return {
        isDropdownOpen,
        selectedRoom,
        isGenerating,
        error,
        beforeImage,
        afterImages,
        currentImageIndex,
        showConfetti,
        fileInputRef,
        toggleDropdown,
        handleRoomSelect,
        handleUpload,
        handleFileChange,
        handleNextImage,
        handlePrevImage,
        handleCloseErrorDialog,
    };
};