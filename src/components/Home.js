import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="content-header col-xs-10 col-xs-offset-2">
          <h1> Open Ticket </h1>
          <p> Submit a ticket to Zendesk on behalf of a customer </p>
        </div>

        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-xs-3 control-label">Customer Name</label>
            <div className="col-xs-9">
              <input type="text" placeholder="Name" className="form-control"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-xs-3 control-label">Customer Email</label>
            <div className="col-xs-9">
              <input type="text" placeholder="Email" className="form-control"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-xs-3 control-label">Subject</label>
            <div className="col-xs-9">
              <input type="text" placeholder="Enter a subject for this ticket" className="form-control"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-xs-3 control-label">Body</label>
            <div className="col-xs-9">
              <textarea rows="5" placeholder="Describe what the ticket is for" className="form-control"/>
            </div>
          </div>

          <div className="col-xs-offset-11">
            <input  className="btn btn-default" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
