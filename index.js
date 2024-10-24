const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.text());

const TARGET_URL = 'https://calm-awfully-shrew.ngrok-free.app/api/data';

app.post('/data', async (req, res) => {
  try {
    const plainTextData = req.body;
    console.log('Received plain text data:', plainTextData);
    console.log('Content-Type:', req.headers['content-type']);
    
    // Log completo de la petición que enviamos
    console.log('Sending to:', TARGET_URL);
    console.log('Sending data:', plainTextData);

    const response = await axios.post(TARGET_URL, plainTextData, {
      headers: {
        'Content-Type': 'text/plain',
        'Accept': '*/*'
      },
      // Añadir más detalles del error
      validateStatus: function (status) {
        return status < 600; // Acepta cualquier estado para poder ver el error
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
    res.send(response.data);
    
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      } : 'No response',
      request: error.request ? 'Request was made' : 'No request'
    });
    
    res.status(500).json({
      error: 'Proxy error',
      details: error.message,
      response: error.response ? error.response.data : null
    });
  }
});

app.get('/', (req, res) => {
  res.send('Proxy server is running - configured for plain text with debug');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});