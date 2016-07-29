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

serverRoutes.get('*', (req, res) => {
  res.status(404).json({'error': 'Sorry this page does not exist!'});
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
    .catch(err => res.status(400).json({error: err}) );
});

serverRoutes.post('/api/v1/submit_ticket', (req, res) => {
  const formErrors = validateForm(req.body);

  if (formErrors) {
    res.status(400).json({error: formErrors});
  } else {
    zenDeskClient.createTicket(req.zenDeskUser.id, req.body)
      .then(ticket => res.status(200).json(ticket))
      .catch(err => res.status(400).json({error: err}));
  }

  function validateForm(form) {
    const requiredFields = {
      name: 'Customer Name',
      email: 'Customer Email',
      subject: 'Subject',
      body: 'Body'
    };

    const errors = Object.keys(requiredFields).map(field => 
      !form[field] ? `${requiredFields[field]} is Required` : null
    ).filter(field => field);

    return errors.length > 0 ? errors : null;
  }
});

export default serverRoutes;
