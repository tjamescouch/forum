import React from 'react';
import UserAPI from '../api/UserAPI';
import SignIn from './SignIn';
import { withRouter } from "react-router";


class SignInContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggingIn: false,
      email: '',
      password: '',
      error: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  isValid() {

    if(this.state.email.length === 0) {
      this.setState({error: 'Email is required'});
      return false;
    }

    if(this.state.password.length === 0) {
      this.setState({error: 'Password is required'});
      return false;
    }

    console.log('isvalid');
    this.setState({error: ''});
    return true;
  }

  async onSignUp() {
    if(!this.isValid()) {
      return;
    }
    this.setState({loggingIn:true});
    try {
      await UserAPI.signIn({email:this.state.email,
                            password:this.state.password});
      this.props.history.push('/');
    } catch (error) {
      console.error(error);
      //FIXME - add better error handling here
      this.setState({error: "Invalid username or password"});
    }
    this.setState({loggingIn: false});
  }

  onSubmit() {
    this.onSignUp();
    return false;
  }

  onInputChange(event) {
    const target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({[name]: value});
  }

  render() {
    return (
      <SignIn creatingUser={this.state.loggingIn}
              error={this.state.error}
              email={this.state.email}
              password={this.state.password}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}/>
    );
  }
}

export default withRouter(SignInContainer);
