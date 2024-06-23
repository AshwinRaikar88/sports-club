import React, { useState } from 'react';
import './FileUpload.css';

const FileUpload = ({ handleUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    } else {
      setError('No file chosen');
    }
  };

  const handleFile = (file) => {
    setError(''); // Clear any previous errors
    if (file.type !== "application/json") {
      setError('Only JSON files are allowed');
      return;
    }
    handleUpload({ target: { files: [file] } });
  };

  return (
    <div>
      <form className="file-upload" onDragEnter={handleDrag}>
        <input
          type="file"
          accept=".json"
          onChange={handleChange}
          id="file-input"
          className="file-input"
        />
        <label
          htmlFor="file-input"
          className={`file-label ${dragActive ? 'active' : ''}`}
        >
          <div className="text">
            {dragActive ? (
              <p>Drop the file here...</p>
            ) : (
              <p>Drag 'n' drop a data file here</p>
            )}
            <button type="button" className="custom-btn">Upload</button>
          </div>
        </label>
        {dragActive && (
          <div
            className="drag-overlay"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          />
        )}
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default FileUpload;
