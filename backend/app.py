from flask import Flask, jsonify, request
from flask_cors import CORS
import csv
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Crear directorio para datos si no existe
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

CSV_FILE = os.path.join(DATA_DIR, 'contactos.csv')

MEDIA_DIR = os.path.join(DATA_DIR, 'media')
if not os.path.exists(MEDIA_DIR):
    os.makedirs(MEDIA_DIR)

# Crear archivo CSV con headers si no existe
def init_csv():
    if not os.path.exists(CSV_FILE):
        with open(CSV_FILE, 'w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow([
                'fecha_hora', 'nombre', 'email', 'empresa', 
                'telefono', 'tipo_consulta', 'mensaje'
            ])

init_csv()

@app.route("/")
def hello():
    data = [
        {"nombre": "Vanesa", "puesto": "Desarrolladora"},
        {"nombre": "Alfredo", "puesto": "DevOps"},
        {"nombre": "Andrea", "puesto": "Project Manager"},
        {"nombre": "Andrea Cristina", "puesto": "Analista"},
        {"nombre": "Presta", "puesto": "Deployment"}
    ]
    return jsonify(data=data)

@app.route("/contacto", methods=["POST"])
def guardar_contacto():
    try:
        # Obtener datos del formulario
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No se recibieron datos"}), 400
        
        # Validar campos requeridos
        campos_requeridos = ['nombre', 'email', 'tipoConsulta', 'mensaje']
        for campo in campos_requeridos:
            if not data.get(campo):
                return jsonify({"error": f"El campo {campo} es requerido"}), 400
        
        # Preparar datos para CSV
        fecha_hora = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        fila_datos = [
            fecha_hora,
            data.get('nombre', ''),
            data.get('email', ''),
            data.get('empresa', ''),
            data.get('telefono', ''),
            data.get('tipoConsulta', ''),
            data.get('mensaje', '')
        ]
        
        # Guardar en CSV
        with open(CSV_FILE, 'a', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(fila_datos)
        
        return jsonify({
            "mensaje": "Contacto guardado exitosamente",
            "fecha": fecha_hora
        }), 200
        
    except Exception as e:
        return jsonify({"error": f"Error al guardar: {str(e)}"}), 500

@app.route("/contactos", methods=["GET"])
def listar_contactos():
    """Endpoint para ver todos los contactos guardados (opcional para administración)"""
    try:
        contactos = []
        if os.path.exists(CSV_FILE):
            with open(CSV_FILE, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    contactos.append(row)
        
        return jsonify({
            "contactos": contactos,
            "total": len(contactos)
        }), 200
        
    except Exception as e:
        return jsonify({"error": f"Error al leer contactos: {str(e)}"}), 500

@app.route('/transcribe', methods=['POST'])
def transcribe_media():
    if 'media' not in request.files:
        return jsonify({'error': 'No se envió ningún archivo.'}), 400
    media_file = request.files['media']
    filename = media_file.filename
    save_path = os.path.join(MEDIA_DIR, filename)
    media_file.save(save_path)
    # Aquí se puede agregar el procesamiento con Assembly/OpenAI
    return jsonify({
        'message': 'Archivo recibido correctamente.',
        'filename': filename,
        'path': save_path
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)