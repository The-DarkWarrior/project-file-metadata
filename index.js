var express = require('express');
var cors = require('cors');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán los archivos subidos

require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Ruta para manejar la carga de archivos
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  // Aquí accedes a la información del archivo subido
  const file = req.file;

  if (!file) {
    // Si no se subió ningún archivo, devuelves un mensaje de error
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Devuelves la información del archivo subido en la respuesta JSON
  res.json({
    name: file.originalname, // Nombre original del archivo
    type: file.mimetype,     // Tipo MIME del archivo
    size: file.size          // Tamaño del archivo en bytes
  });
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
