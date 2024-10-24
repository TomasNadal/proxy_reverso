const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.text()); // Para manejar texto plano

const TARGET_URL = 'https://calm-awfully-shrew.ngrok-free.app/api/data';

app.post('/data', async (req, res) => {
  try {
    const plainTextData = req.body;
    console.log('Received plain text data:', plainTextData);
    
    const response = await axios.post(TARGET_URL, plainTextData, {
      headers: {
        'Content-Type': 'text/plain'
      }
    });
    
    console.log('Response from target:', response.data);
    res.send(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).send('Proxy error: ' + error.message);
  }
});

app.get('/', (req, res) => {
  res.send('Proxy server is running - configured for plain text');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});