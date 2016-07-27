import fetch from 'isomorphic-fetch';
import path from 'path';
import { Router } from 'express';

const serverRoutes = Router();

// Front-End Routes
serverRoutes.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

serverRoutes.get('*', function(req, res) {
  res.json({
    'route': 'Sorry this page does not exist!'
  });
});
  
// Api Routes
serverRoutes.all('/api/*', requireAuthentication);

serverRoutes.post('/api/v1/submit_ticket', (req, res) => {
  const error = validateForm(req.body);

  if (error) {
    res.status(400).json({ error: error });
  } else {
    submitToZendesk(req.body);
    res.json(req.body);
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

function requireAuthentication (req, res, next) {
  const authToken = req.header('Auth-Token');

  fetch('https://foray.auth0.com/tokeninfo', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
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
