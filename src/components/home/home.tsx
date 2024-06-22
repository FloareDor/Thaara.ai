import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Loader2, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import ImageSlider from "../ui/imageslider";
import ErrorDialog from "./errorDialog";
import { ImageGen } from './imageGen';
import ReactConfetti from 'react-confetti';

const HomeComponent: React.FC = () => {
    const {
        isDropdownOpen,
        selectedRoom,
        isGenerating,
        error,
        beforeImage,
        afterImages,
        currentImageIndex,
        fileInputRef,
        toggleDropdown,
        handleRoomSelect,
        handleUpload,
        handleFileChange,
        handleNextImage,
        handlePrevImage,
        handleCloseErrorDialog,
    } = ImageGen();

    const [showConfetti, setShowConfetti] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        if (afterImages.length > 1) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 5000); // Stop after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [afterImages]);

    const roomTypes = ["Living Room", "Bedroom"];

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    return (
        <div className="lg:h-[calc(100vh-4.5rem)] w-[85%] min-[500px]:w-4/5 md:w-3/4 lg:w-4/5 mx-auto lg:mb-0 mb-20 relative">
            {showConfetti && <ReactConfetti recycle={false} />}
            <div className="pt-16 sm:pt-24 md:pt-32 lg:pt-28 xl:pt-32 2xl:pt-40 flex flex-col lg:flex-row items-center lg:items-start lg:justify-around gap-y-20 w-full">
                <div className="lg:pt-10 xl:pt-20 flex flex-col gap-y-5 w-fit h-fit mx-auto lg:mx-0 animate-drop-in px-5 md:px-0">
                    <span className="text-white text-3xl sm:text-5xl font-semibold leading-tight">Generate interior for your room. In one click.</span>
                    <span className="text-white text-base sm:text-lg mb-2">Choose from various design types and transform your space instantly.</span>
                    <div className="flex flex-row gap-4 items-center justify-start">
                        <div className="relative">
                            <Button
                                variant="secondary"
                                className="px-6 py-2 flex justify-between items-center min-w-[150px]"
                                onClick={toggleDropdown}
                            >
                                {selectedRoom}
                                {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </Button>
                            {isDropdownOpen && (
                                <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg">
                                    <ul className="">
                                        {roomTypes.map((room, index) => (
                                            <li
                                                key={index}
                                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer border border-[#2D2D2D]"
                                                onClick={() => handleRoomSelect(room)}
                                            >
                                                {room}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        {isGenerating ? (
                            <Button variant="secondary" className="px-6 py-2" disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating image
                            </Button>
                        ) : (
                            <Button variant="secondary" className="px-6 py-2" onClick={handleUpload}>
                                Upload
                            </Button>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".png,.jpg,.jpeg"
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
				<div className={`w-full h-auto ${isFullScreen ? 'lg:min-w-[680px]' : 'lg:w-[680px]'}`}>
				<div className="container mx-auto w-full">
					<h1 className="text-2xl font-bold">Before & After Slider</h1>
					<div className={`relative ${isFullScreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
						<ImageSlider beforeImgSrc={beforeImage} afterImgSrc={afterImages[currentImageIndex]} />
						<div className="absolute bottom-4 right-4 flex gap-2">
							{afterImages.length > 1 && (
								<>
									<Button variant="secondary" size="icon" onClick={handlePrevImage}>
										<ChevronLeft className="h-4 w-4" />
									</Button>
									<Button variant="secondary" size="icon" onClick={handleNextImage}>
										<ChevronRight className="h-4 w-4" />
									</Button>
								</>
							)}
							<Button variant="secondary" size="icon" onClick={toggleFullScreen} className=''>
								{isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
							</Button>
						</div>
					</div>
				</div>
			</div>
            </div>
            <ErrorDialog error={error} onClose={handleCloseErrorDialog} />
        </div>
    );
};

export default HomeComponent;