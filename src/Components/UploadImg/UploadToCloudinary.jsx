const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'uploadImg');
    formData.append('folder', 'Tuan08');

    try {
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dlbg2caig/image/upload',
            {
                method: 'POST',
                body: formData,
            },
        );

        const data = await res.json();
        return data.secure_url;
    } catch (error) {
        console.error('Upload Cloudinary lỗi:', error);
        return null;
    }
};

export default uploadToCloudinary;