import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { signup } from '../../actions';

class Singup extends Component {
  signup = formProps => {
    this.props.signup(formProps, () => {
      this.props.history.push('/feature');
    });
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.signup)}>
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
    { signup }
  ),
  reduxForm({ form: 'signup' })
)(Singup);
