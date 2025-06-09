const express = require('express'); // Framework para crear el servidor web
const fs = require('fs'); // Módulo para manejar archivos (leer, escribir, etc.)
const path = require('path'); // Módulo para trabajar con rutas de archivos

// Creamos una instancia de Express
const app = express();

// Definimos el puerto en el que correrá el servidor
const PORT = 3000;

// Middleware para poder leer datos en formato JSON desde el cuerpo de las peticiones
app.use(express.json());

// Creamos el endpoint POST /alumno
app.post('/alumno', (req, res) => {
  // Extraemos los datos del cuerpo de la petición
  const { cuenta, nombre, promedio, grado, grupo } = req.body;

  // Verificamos que todos los campos estén presentes
  if (!cuenta || !nombre || promedio == null || !grado || !grupo) {
    // Si falta algún dato, respondemos con error 400 (bad request)
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Creamos un objeto con los datos del alumno
  const alumno = { cuenta, nombre, promedio, grado, grupo };

  // Definimos la ruta del archivo donde se guardará la información
  const filePath = path.join(__dirname, 'alumno.txt');

  // Escribimos los datos en el archivo en formato JSON
  fs.writeFile(filePath, JSON.stringify(alumno, null, 2), (err) => {
    if (err) {
      // Si hay un error al guardar el archivo, respondemos con error 500 (server error)
      return res.status(500).json({ error: 'Error al guardar el archivo' });
    }

    // Si todo va bien, respondemos con un mensaje de éxito y los datos guardados
    res.status(200).json({ mensaje: 'Alumno guardado correctamente', alumno });
  });
});

// Iniciamos el servidor y lo ponemos a escuchar en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
