import fetch from 'isomorphic-fetch';
import jwt from 'express-jwt';
import path from 'path';
import { Router } from 'express';

const serverRoutes = Router();
const auth0Authorization = jwt({
  secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

// Front-End Routes
serverRoutes.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

serverRoutes.get('*', function(req, res) {
  res.json({'route': 'Sorry this page does not exist!'});
});
  
// Api Routes
serverRoutes.use('/api/*', auth0Authorization);
serverRoutes.use('/api/*', loadCurrentUser);
serverRoutes.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: 'Unauthorized'});
  }
});

serverRoutes.post('/api/v1/submit_ticket', (req, res) => {
  const error = validateForm(req.body);

  if (error) {
    res.status(400).json({ error: error });
  } else {
    submitToZendesk(req.body);
    res.status(200).json(req.body);
  }

  function submitToZendesk(form) {
    console.log('submitToZendesk', form);
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

function loadCurrentUser (req, res, next) {
  const authToken = req.headers.authorization.split(' ')[1]

  fetch('https://foray.auth0.com/tokeninfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': req.header.authorzation
    },
    body: JSON.stringify({
      id_token: authToken
    })
  }).then(response => {
    if (response.status === 200) {
      response.json().then(json => {
        req.currentUser = json;
        next();
      });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }).catch(error=> res.status(500).json({ error: error }));
}

export default serverRoutes;
