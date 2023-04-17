import React, { useState, Component } from 'react';
import { useLocation, useNavigate } from 'react-router';
import axios from "axios";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import { Route, Navigate} from 'react-router-dom';
import { Button,Grid,Input,Image, Message, Form,Header, Segment } from 'semantic-ui-react';


async function refreshPage() {
  return(
  window.location.reload(false))
}

async function signUpUser(credentials) {
    const { username, email, password1,password2 } = credentials;
    //const location = useLocation();
    //const navigate = useNavigate();

    axios
    .post("http://127.0.0.1:8000/api/rest-auth/registration/", {
        username, email, password1, password2
    }) 
    .then(
      (response) => {
        console.log(response)
        if (response.status == 201) {
          sessionStorage.setItem('token', response.data.key)
          sessionStorage.setItem('user_id', response.data.user.id)
          sessionStorage.setItem('username', response.data.user.username)
          refreshPage()}
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



export default function SignUp() {
  const token = sessionStorage.getItem('token');
    const [username, setUsername] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();
    const [email, setEmail] = useState();   

    const handleSubmit = async e => {
      
        e.preventDefault();
        const token = await signUpUser({
          username,
          email,
          password1,
          password2
        })
        
    }

    if (token) {
      return (<Home />)}
      else{
        return (
            <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 550 }}>
              <Header as='h2' color='pink' textAlign='center'>
                <Image src='/logo.svg' /> Sign up for an account
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
                    onChange={event => setPassword1(event.target.value)}
                    placeholder='Password'
                    type='password'
                  />
                  <br/>
                  <Input 
                    fluid
                    icon='lock'
                    iconPosition='left'
                    onChange={event => setPassword2(event.target.value)}
                    placeholder='Confirm Password'
                    type='password'
                  />
                  <br/>
                  <Button type="submit" color='pink' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        );
        }
}

