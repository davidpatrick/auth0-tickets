import path from 'path';
import { Router } from 'express';

const serverRoutes = Router();

serverRoutes.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

serverRoutes.post('/api/v1/submit_ticket', (req, res) => {
  console.log('body', req.body);
  res.json(req.body);
});

serverRoutes.get('*', function(req, res) {
  res.json({
    'route': 'Sorry this page does not exist!'
  });
});

export default serverRoutes;
