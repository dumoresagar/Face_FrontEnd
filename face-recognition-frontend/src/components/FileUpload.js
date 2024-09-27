// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUpload = () => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [uploadedImage, setUploadedImage] = useState(null);
//     const [matchedImage, setMatchedImage] = useState(null);
//     const [matchName, setMatchName] = useState('');

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//         setUploadedImage(URL.createObjectURL(e.target.files[0]));
//     };

//     const handleUpload = async () => {
//         if (selectedFile) {
//             const formData = new FormData();
//             formData.append('image', selectedFile);

//             try {
//                 const response = await axios.post('http://192.168.1.141:8001/api/version_0/authentication/recognize/', formData);
                
//                 setMatchName(response.data.data);
//                 setMatchedImage(response.data.image_url);
//             } catch (error) {
//                 console.error("Error during API call:", error);
//                 alert("Failed to recognize face");
//             }
//         } else {
//             alert("Please select a file first");
//         }
//     };

//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//         <h2>Face Recognition</h2>
//         <input type="file" onChange={handleFileChange} />
//         <button onClick={handleUpload} style={{ marginTop: '20px' }}>Upload and Recognize</button>

//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//             {uploadedImage && (
//                 <div style={{ margin: '0 20px' }}>
//                     <h3>Uploaded Image:</h3>
//                     <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '300px', maxHeight: '300px' }} />
//                 </div>
//             )}

//             {matchedImage && (
//                 <div style={{ margin: '0 20px' }}>
//                     <h3>Matched Face: {matchName}</h3>
//                     <img src={matchedImage} alt="Matched" style={{ maxWidth: '300px', maxHeight: '300px' }} />
//                 </div>
//             )}
//         </div>
//     </div>
//     );
// };

// export default FileUpload;

import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css'; // Ensure you have this CSS file

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [matchedImage, setMatchedImage] = useState(null);
    const [matchName, setMatchName] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setUploadedImage(URL.createObjectURL(e.target.files[0]));

        // Clear previous results when a new file is selected
        setMatchName('');
        setMatchedImage(null);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);

            setLoading(true); // Start loading

            try {
                const response = await axios.post('https://b994-2402-e280-3e52-4e4-791b-b24f-3054-9602.ngrok-free.app/api/version_0/authentication/recognize/', formData);
                
                setMatchName(response.data.data);
                setMatchedImage(response.data.image_url);
            } catch (error) {
                console.error("Error during API call:", error);
                alert("Failed to recognize face");
            } finally {
                setLoading(false); // Stop loading
            }
        } else {
            alert("Please select a file first");
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Face Recognition</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} style={{ marginTop: '20px' }}>
                {loading ? 'Uploading...' : 'Upload and Recognize'}
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {uploadedImage && (
                    <div style={{ margin: '0 20px' }}>
                        <h3>Uploaded Image:</h3>
                        <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                    </div>
                )}

                {loading ? ( // Show loader while loading
                    <div className="spinner" style={{ margin: '0 20px', alignSelf: 'center' }}></div>
                ) : matchedImage && (
                    <div style={{ margin: '0 20px' }}>
                        <h3>Matched Face: {matchName}</h3>
                        <img src={matchedImage} alt="Matched" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;


