export default class ZenDeskMiddleware {
  constructor(zenDeskApi) {
    this.zenDeskApi = zenDeskApi;
    this.loadZenDeskUser = this.loadZenDeskUser.bind(this);
  }

  loadZenDeskUser (req, res, next) {
    this.zenDeskApi.findOrCreateAgent(req.user)
      .then(user => {
        req.zenDeskUser = user;
        next();
      })
      .catch(err => res.status(400).json({error: err}) );
  }
}
