import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { signin } from '../../actions';

class Singin extends Component {
  signin = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push('/feature');
    });
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.signin)}>
        <fieldset>
          <label>Email</label>
          <Field
            autoComplete="off"
            name="email"
            type="text"
            component="input"
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
            autoComplete="off"
            name="password"
            type="password"
            component="input"
          />
        </fieldset>
        {this.props.errorMessage && <div>{this.props.errorMessage}</div>}
        <button>Sign Up!</button>
      </form>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ errorMessage: auth.errorMessage });

export default compose(
  connect(
    mapStateToProps,
    { signin }
  ),
  reduxForm({ form: 'signin' })
)(Singin);
