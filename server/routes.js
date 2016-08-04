import jwt from 'express-jwt';
import { Router } from 'express';
import ZenDeskApi from './ZenDeskApi';
import ZenDeskMiddleware from './ZenDeskMiddleware';
import PromiseResolver from './utils/PromiseResolver';

const serverRoutes = Router();
const auth0Authorization = jwt({
  secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});
const zenDeskApi = new ZenDeskApi(PromiseResolver.call);
const zenDeskMiddleware = new ZenDeskMiddleware(zenDeskApi);

// Api Routes
serverRoutes.use('*', auth0Authorization);
serverRoutes.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: 'Unauthorized'});
  }
});

serverRoutes.use('/v1/submit_ticket', zenDeskMiddleware.loadZenDeskUser);

serverRoutes.post('/v1/submit_ticket', (req, res) => {
  const formErrors = validateForm(req.body);

  if (formErrors) {
    res.status(400).json({error: formErrors});
  } else {
    zenDeskApi.createTicket(req.zenDeskUser.id, req.body)
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
