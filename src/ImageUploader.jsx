import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('https://api.imgbb.com/1/upload?key=apikeyfromprofile', formData);
      setImageUrl(response.data.data.url);
    } catch (error) {
      console.error('Something went wrong:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      {/* {imageUrl && <img src={imageUrl} alt="Uploaded" />} */}
      {imageUrl && <p>{imageUrl}</p>}
    </div>
  );
}

export default ImageUploader;
