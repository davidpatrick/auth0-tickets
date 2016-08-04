import zendesk from 'node-zendesk';

export default class ZenDeskApi {
  constructor(callbackResolver) {
    this.zenDeskClient = zendesk.createClient({
      username:  process.env.ZENDESK_USERNAME,
      token:     process.env.ZENDESK_TOKEN,
      remoteUri: process.env.ZENDESK_URL
    });

    this.callbackResolver = callbackResolver;
  }

  findOrCreateAgent(user) {
    return new Promise((resolve, reject) => {
      if (user.email && user.email_verified) {
        this.findInternalUsersByEmail(user.email)
          .then(users => {
            if (users && users.length > 0) {
              resolve(users[0]);
            } else {
              this.createAgent(user)
                .then(res => resolve(res))
                .catch(err => reject(err));
            }
          })
          .catch(err => reject(err));
      } else {
        reject('Email is not verified');
      }
    });
  }
  
  findInternalUsersByEmail(email) {
    let payload = 'type:user role:agent role:admin ';
    payload += [].concat(email).map(email => `email:${email}`).join(' ');

    return new Promise((resolve, reject) => 
      this.zenDeskClient.search.query(payload, this.callbackResolver(resolve, reject))
    );
  }

  createAgent(attributes) {
    const payload = {
      "user": {
        "name": attributes.nickname,
        "email": attributes.email,
        "role": "agent"
      }
    };

    return new Promise((resolve, reject) => 
      this.zenDeskClient.users.create(payload, this.callbackResolver(resolve, reject))
    );
  }

  createTicket(agent_id, form) {
    const payload = {
      "ticket": {
        "requester": {
          "name": form.name, 
          "email": form.email
        }, 
        "submitter_id": agent_id, 
        "subject": form.subject, 
        "comment": { 
          "body": form.body
        },
        "type": form.type.toLowerCase(), 
        "priority": form.priority.toLowerCase()
      }
    };

    if (form.cc) {
      payload.ticket.collaborators = form.cc.trim().split(/[ ,]+/);
    }

    return new Promise((resolve, reject) => {
      this.zenDeskClient.tickets.create(payload, (err, req, res) => 
        err ? reject(parseZenDeskTicketErrors(err)) : resolve(res)
      );
    });
  }
}

function parseZenDeskTicketErrors(err) { 
  const errMsg = err.result.toString();
  const errDetails = JSON.parse(errMsg).details;
  const errors = Object.keys(errDetails).map(detail =>
    errDetails[detail].map(detailErrors => 
      detailErrors.description.replace('Requester', 'Customer')
    )
  );

  return errors.reduce((errorsArray, detailArray) => errorsArray.concat(detailArray));
}
