import React, { useState } from "react";
import BackendResponse from "./BackendResponse";
import "./UploadMedia.css";

const UploadMedia = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [type, setType] = useState("");
  const [response, setResponse] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL + "transcribe";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setType(selectedFile.type.startsWith("video") ? "video" : "audio");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("media", file);
    try {
      const res = await fetch(`${backendUrl}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: "Error al conectar con el backend." });
    }
  };

  return (
    <div className="upload-media-container">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="audio/*,video/*"
          onChange={handleFileChange}
        />
        {previewUrl && (
          <div className="preview">
            {type === "video" ? (
              <video controls src={previewUrl} width="400" />
            ) : (
              <audio controls src={previewUrl} type={file ? getAudioMimeType(file.name) : undefined} />
            )}
          </div>
        )}
        <button type="submit" disabled={!file}>
          Enviar al backend
        </button>
      </form>
      <BackendResponse response={response} />
    </div>
  );
};

// Función para obtener el tipo MIME según la extensión
function getAudioMimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  switch (ext) {
    case 'wav': return 'audio/wav';
    case 'mp3': return 'audio/mpeg';
    case 'ogg': return 'audio/ogg';
    case 'aac': return 'audio/aac';
    case 'flac': return 'audio/flac';
    default: return 'audio/*';
  }
}

export default UploadMedia;
