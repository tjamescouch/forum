import React from 'react';
import { Form, Message, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import './SignUp.css'

function SignUp({name,
                 email,
                 password,
                 password2,
                 error,
                 onInputChange,
                 onSubmit}) {
  return (
    <div className='SignUp'>
      <div />
      <div className="SignUp-form-wrapper">
        <Form onSubmit={onSubmit} autoComplete="off" error>
          <Form.Input name="name" label='Name' placeholder='Enter your name' value={name} onChange={onInputChange} />
          <Form.Input name="email" label='Email' placeholder='Enter your email' value={email} onChange={onInputChange} />
          <Form.Input name="password" label='Password' type="password" placeholder='Enter a password' value={password} onChange={onInputChange} />
          <Form.Input name="password2" label='Confirm Password' type="password" placeholder='Confirm your password' value={password2} onChange={onInputChange} />
          {error &&
            <Message
              error
              header='Error'
              content={error}
            />
          }
          <br />
          <Button>Sign Up</Button>
        </Form>
      </div>
      <div />
    </div>
  );
}

export default SignUp;
