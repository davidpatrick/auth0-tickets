import ZenDeskApi from './ZenDeskApi';

const zenDeskClient = new ZenDeskApi();

export default class ZenDeskMiddleware {
  constructor() {}

  loadZenDeskUser (req, res, next) {
    zenDeskClient.findOrCreateUser(req.user)
      .then(user => {
        req.zenDeskUser = user;
        next();
      })
      .catch(err => res.status(400).json({error: err}) );
  }
}
