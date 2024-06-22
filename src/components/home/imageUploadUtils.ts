// imageUploadUtils.ts

export const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

export const handleFileUpload = async (
    file: File, 
    roomType: string,
    onSuccess: (data: any) => void,
    onError: (error: string) => void
) => {
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
        onError("Please upload only PNG or JPG images.");
        return;
    }

    try {
        const base64 = await convertToBase64(file);

        const response = await fetch('https://thaara-qirai.ondigitalocean.app/submit_job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: base64.split('base64,')[1],
                room_type: roomType.toLowerCase(),
            }),
        });

        if (response.ok) {
            const data = await response.json();
            onSuccess(data);
        } else {
            onError('Failed to submit job');
        }
    } catch (error) {
        onError('Error submitting job: ' + (error as Error).message);
    }
};