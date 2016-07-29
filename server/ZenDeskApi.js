import zendesk from 'node-zendesk';

export default class ZenDeskApi {
  constructor(user, token, url) {
    this.zenDeskClient = zendesk.createClient({
      username:  process.env.ZENDESK_USERNAME,
      token:     process.env.ZENDESK_TOKEN,
      remoteUri: process.env.ZENDESK_URL
    });
  }

  findOrCreateUser (user) {
    return new Promise((resolve, reject) => {
      if (user.email && user.email_verified) {
        this.findByEmail(user.email)
          .then(response => {
            if (response) {
              resolve(response);
            } else {
              this.createUser(user)
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
  
  findByEmail(email) {
    const query = `type:user email:${email} role:agent role:admin`;
    return new Promise((resolve, reject) => {
      this.zenDeskClient.search.query(query, function (err, req, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res[0]);
        }
      });
    });
  }

  createUser(attributes) {
    const user = {
      "user": {
        "name": attributes.nickname,
        "email": attributes.email,
        "role": "agent"
      }
    };

    return new Promise((resolve, reject) => {
      this.zenDeskClient.users.create(user, function (err, req, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  createTicket(agent_id, form) {
    const ticket = {
      "ticket": {
        "requester": {
          "name": form.name, 
          "email": form.email
        }, 
        "submitter_id": agent_id, 
        "subject": form.subject, 
        "comment": { 
          "body": form.body
        }
      }
    };

    return new Promise((resolve, reject) => {
      this.zenDeskClient.tickets.create(ticket, (err, req, res) => {
        if (err) {
          reject(this.parseZenDeskApiErrors(err));
        } else {
          resolve(res);
        }
      });
    });
  }

  parseZenDeskApiErrors(err) {
    const errMsg = err.result.toString();
    const errDetails = JSON.parse(errMsg).details;
    const errors = Object.keys(errDetails).map(detail =>
      errDetails[detail].map(detailErrors => 
        detailErrors.description.replace('Requester', 'Customer')
      )
    );

    return errors.reduce((errorsArray, detailArray) => errorsArray.concat(detailArray));
  }
}
