import React from "react";

const BackendResponse = ({ response }) => {
  if (!response) return null;

  return (
    <div className="backend-response">
      <h3>Respuesta del servidor</h3>
      {response.error ? (
        <p style={{ color: 'red' }}>{response.error}</p>
      ) : (
        <div>
          <p><strong>Mensaje:</strong> {response.message}</p>
          <p><strong>Archivo:</strong> {response.filename}</p>
        </div>
      )}
    </div>
  );
};

export default BackendResponse;
