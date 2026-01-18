const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/views', express.static('views'));

const submissionsDir = path.join(__dirname, 'submissions');
if (!fs.existsSync(submissionsDir)) {
  fs.mkdirSync(submissionsDir);
}

// NEW: Root route to serve the survey form
app.get('/', (req, res) => {
  // Adjust the path if your index.html is inside a 'public' folder
  res.sendFile(path.join(__dirname, 'index.html')); 
});

// API: Submit survey
app.post('/api/submit', (req, res) => {
  const data = req.body;
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19); 
  const fileName = `customer_${timestamp}.json`;
  const filePath = path.join(submissionsDir, fileName);

  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});

// API: Get all responses
app.get('/api/responses', (req, res) => {
  fs.readdir(submissionsDir, (err, files) => {
    if (err) return res.status(500).json([]);
    const responses = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        try {
          const content = fs.readFileSync(path.join(submissionsDir, file), 'utf8');
          const data = JSON.parse(content);
          data._timestamp = file.replace('customer_', '').replace('.json', '').replace(/-/g, ':').replace('_', 'T');
          return data;
        } catch (e) { return null; }
      }).filter(Boolean);
    res.json(responses);
  });
});

// HTML Routes
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.get(['/marketing-leads', '/marketinglead.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Marketinglead.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Dashboard available at http://localhost:${PORT}/dashboard`);
});