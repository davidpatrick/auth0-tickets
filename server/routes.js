import jwt from 'express-jwt';
import path from 'path';
import { Router } from 'express';
import ZenDeskApi from './ZenDeskApi';

const serverRoutes = Router();
const auth0Authorization = jwt({
  secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});
const zenDeskClient = new ZenDeskApi();

// Front-End Routes
serverRoutes.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

serverRoutes.get('*', function(req, res) {
  res.json({'route': 'Sorry this page does not exist!'});
});
  
// Api Routes
serverRoutes.use('/api/*', auth0Authorization);
serverRoutes.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: 'Unauthorized'});
  }
});

serverRoutes.use('/api/v1/submit_ticket', (req, res, next) => {
  zenDeskClient.findOrCreateUser(req.user)
    .then(user => {
      req.zenDeskUser = user;
      next();
    })
    .catch(err => res.status(400).json({ error: err}) );
});

serverRoutes.post('/api/v1/submit_ticket', (req, res) => {
  const error = validateForm(req.body);

  if (error) {
    res.status(400).json({ error: error });
  } else {
    zenDeskClient.createTicket(req.zenDeskUser.id, req.body)
      .then(ticket => res.status(200).json(ticket))
      .catch(err => res.status(400).json({ error: error }));
  }

  function validateForm(form) {
    if (!hasRequiredFields(form)) {
      return 'Missing Required Fields';
    } else {
      return null;
    }
  }

  function hasRequiredFields(form) {
    return !!form.name && !!form.email && !!form.subject && !!form.body;
  }
});

export default serverRoutes;
