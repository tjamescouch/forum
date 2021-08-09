import React from 'react';
import { Form, Message, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import './SignIn.css'

function SignIn({email,
                 password,
                 error,
                 onInputChange,
                 onSubmit}) {
  return (
    <div className='SignIn'>
      <div />
      <div className="SignIn-form-wrapper">
        <Form onSubmit={onSubmit} autoComplete="off" error>
          <Form.Input name="email" label='Email' placeholder='Enter your email' value={email} onChange={onInputChange} />
          <Form.Input name="password" label='Password' type="password" placeholder='Enter a password' value={password} onChange={onInputChange} />
          {error &&
            <Message
              error
              header='Error'
              content={error}
            />
          }
          <br />
          <Button>Sign In</Button>
        </Form>
      </div>
      <div />
    </div>
  );
}

export default SignIn;
