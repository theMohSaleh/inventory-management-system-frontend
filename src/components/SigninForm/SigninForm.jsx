// SigninForm

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService'; // import the authservice
import { Form, Button, Container } from 'react-bootstrap';

const SigninForm = (props) => {
  const navigate = useNavigate(); // added this for navigation purposes
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData); // TODO build signin service function

      props.setUser(user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <Container className='mt-3'>
      <h1>Log In</h1>
      <p>{message}</p>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <Form.Label htmlFor="email">Username:</Form.Label>
          <Form.Control
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <Form.Label htmlFor="password">Password:</Form.Label>
          <Form.Control
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <Form.Group className='mt-3'>
          <Button className='me-3' type='submit'>Log In</Button>
          <Link to="/">
            <Button>Cancel</Button>
          </Link>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default SigninForm;