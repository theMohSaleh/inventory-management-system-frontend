import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService'
import { Form, Button, Container } from 'react-bootstrap';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData)
      props.setUser(newUserResponse.user);
      navigate('/') // upon redirect you will see the "Dashboard" page
    } catch (err) {
      updateMessage(err.message)
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <Container>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <Form onSubmit={handleSubmit}>
        <div>
          <Form.Label htmlFor="username">Username:</Form.Label>
          <Form.Control
            type="text"
            id="name"
            value={username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <Form.Label htmlFor="password">Password:</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <Form.Label htmlFor="confirm">Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
        </div>
        <div>
          <Button className='me-3' type='submit' disabled={isFormInvalid()}>Sign Up</Button>
          <Link to="/">
            <Button>Cancel</Button>
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignupForm;