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

  loadCollaborators (req, res, next) {
    if (req.body.cc) {
      const ccEmails = req.body.cc.trim().split(/[ ,]+/);
      
      zenDeskClient.findByEmail(ccEmails)
        .then(collaborators => {
          req.body.collaborator_ids = collaborators.map(c => c.id);
          next();
        })
        .catch(err => res.status(400).json({error: err}) );
    } else {
      next();
    }
  }
}
