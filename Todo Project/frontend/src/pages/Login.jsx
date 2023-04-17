import React, { Component, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import axios from "axios";
import SignUp from '../components/SignUp';
import { Route, Link, Navigate} from 'react-router-dom';
import { Button,Grid,Input,Image, Message, Form,Header, Segment } from 'semantic-ui-react';


async function refreshPage() {
  return(
  window.location.reload(false))
}

async function loginUser(credentials) {
    const { username, email, password } = credentials;
    //const location = useLocation();
    //const navigate = useNavigate();

    axios
    .post("http://127.0.0.1:8000/api/rest-auth/login/", {
        username, email, password
    }) 
    .then(
      (response) => {
        console.log(response.data);
        if (response.status == 200) {
          sessionStorage.setItem('token', response.data.key)
          sessionStorage.setItem('user_id', response.data.user.id)
          sessionStorage.setItem('username', response.data.user.username)
          refreshPage()
          };
        })
    .catch(err => {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
    } else if (err.request) {
        console.log(err.request)
    } else {
        // Anything else
    } // => the response payload 
    })

};


export default function Sogin() {
  const token = sessionStorage.getItem('token');
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();   

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          email,
          password
        })
        
    }
    
        return (
            <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 550 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Image src='/logo.svg' /> Log-in to your account
              </Header>
              <Form onSubmit={handleSubmit} size='large'>
                <Segment stacked>
                <Input 
                    fluid
                    icon='user'
                    iconPosition='left'
                    onChange={event => setUsername(event.target.value)}
                    placeholder='Username'
                  />
                  <br/>
                      <Input fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={event => setEmail(event.target.value)}/>
                      <br/>
                  <Input 
                    fluid
                    icon='lock'
                    iconPosition='left'
                    onChange={event => setPassword(event.target.value)}
                    placeholder='Password'
                    type='password'
                  />
                  <br/>
                  <Button type="submit" color='teal' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <a href="/signup">Sign up</a>
              </Message>
            </Grid.Column>
          </Grid>
        );
    
}

