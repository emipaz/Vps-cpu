import React from "react";
import UploadMedia from "./UploadMedia";
import "./TranscribePage.css";
import Navbar from "./Navbar";

const TranscribePage = () => {
  return (
    <>
      <Navbar />
      <div className="transcribe-container">
        <h1>Transcripción de Audio/Video</h1>
        <p>Sube tu archivo de audio o video para obtener la transcripción y análisis.</p>
        <p style={{ color: "#b00", fontWeight: "bold" }}>
          Solo se pueden previsualizar archivos de audio en formatos estándar (WAV PCM 16 bits, MP3, OGG, AAC, etc.).
          Si tu archivo proviene de una central telefónica o tiene una codificación especial, puede que no se reproduzca en el navegador.
        </p>
        <UploadMedia />
      </div>
    </>
  );
};

export default TranscribePage;
