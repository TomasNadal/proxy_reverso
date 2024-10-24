// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const TARGET_URL = 'https://calm-awfully-shrew.ngrok-free.app/api/data';

// Ruta específica para los datos del Arduino
app.post('/data', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const response = await axios.post(TARGET_URL, req.body);
    console.log('Response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Proxy error', details: error.message });
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Proxy server is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});