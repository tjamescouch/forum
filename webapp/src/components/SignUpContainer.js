import React from 'react';
import UserAPI from '../api/UserAPI';
import SignUp from './SignUp';
import { withRouter } from "react-router";


class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingUser: false,
      name: '',
      email: '',
      password: '',
      password2: '',
      error: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  isValid() {
    if(this.state.name.length === 0) {
      this.setState({error: 'Name is required'});
      return false;
    }

    if(this.state.email.length === 0) {
      this.setState({error: 'Email is required'});
      return false;
    }

    if(this.state.password.length < 7) {
      this.setState({error: 'password must be at least 7 characters long'});
      return false;
    }

    if(this.state.password.length > 30) {
      this.setState({error: 'password must be at most 30 characters long'});
      return false;
    }

    if(this.state.password !== this.state.password2) {
      this.setState({error: 'passwords must match'});
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
    this.setState({creatingUser:true});
    try {
      await UserAPI.signUp({name: this.state.name,
                            email:this.state.email,
                            password:this.state.password,
                            password2:this.state.password2});
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
    this.setState({creatingUser: false});
    this.props.history.push('/login')
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
      <SignUp creatingUser={this.state.creatingUser}
              error={this.state.error}
              name={this.state.name}
              email={this.state.email}
              password={this.state.password}
              password2={this.state.password2}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}/>
    );
  }
}

export default withRouter(SignUpContainer);
