import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formBuild, formUpdateValue, formSubmit } from '../actions/';
import Form from './Form';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  componentDidMount() {
    this.props.buildForm([
      {name: 'name', type: 'text', label: 'Customer Name', placeholder: 'Name'},
      {name: 'email', type: 'text', label: 'Customer Email', placeholder: 'Email'},
      {name: 'subject', type: 'text', label: 'Subject', placeholder: 'Enter a Subject'},
      {name: 'body', type: 'textarea', label: 'Body', placeholder: 'Describe what the ticket is for'}
    ]);
  }

  handleInputChange(e) {
    this.props.updateFormValue(e.target.name, e.target.value);
  }

  handleFormSubmission(e) {
    e.preventDefault();
    this.props.submitForm('/api/v1/submit_ticket', this.props.authentication.token, this.props.form.values);
  }

  render() {
    return (
      <main className="container">
        <section className="content-header col-xs-12 col-md-offset-1">
          <h1> Open Ticket </h1>
          <p> Submit a ticket to Zendesk on behalf of a customer </p>
        </section>

        <section className="col-xs-12">
          <Form 
            fields={this.props.form.fields}
            values={this.props.form.values}
            success={this.props.form.success}
            error={this.props.form.error}
            loading={this.props.form.loading}
            handleInputChange={this.handleInputChange}
            handleFormSubmission={this.handleFormSubmission} />
        </section>
      </main>
    );
  }
}

Home.propTypes = {
  form: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired,
  buildForm: PropTypes.func.isRequired,
  updateFormValue: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
    form: state.form
  };
};

function mapDispatchToProps(dispatch) {
  return {
    buildForm: bindActionCreators(formBuild, dispatch),
    updateFormValue: bindActionCreators(formUpdateValue, dispatch),
    submitForm: bindActionCreators(formSubmit, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
