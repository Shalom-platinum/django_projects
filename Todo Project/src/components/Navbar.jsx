import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { Button, Dropdown, Menu, Segment } from 'semantic-ui-react';
import axios from 'axios';
import SignUp from './SignUp';
import Sogin from './Sogin';







class Navbar extends Component {
    state = { activeItem: 'home' };


    refreshPage() {
      return(
      window.location.reload(false))
    }
  signIn = () =>{

    return (
      <Sogin />
    )
  }


  logOut = () => {
     const headers ={
      Authorization: "Token "+sessionStorage.getItem('token')
  }
    axios
    .post("http://127.0.0.1:8000/api/rest-auth/logout/", {headers: headers}) 
        .then(
          (response) => {
            console.log(response.data)
            if (response.status == 200){
              sessionStorage.setItem('token', "")
              sessionStorage.setItem('username', "")
              sessionStorage.setItem('user_id', "")
            this.refreshPage()};
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
    }
  
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
      const token = sessionStorage.getItem('token');
  
      return (
        <Segment inverted>
        <Menu size='tiny'>
        <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          ><Link to="/"><Button color='teal'>Home</Button></Link>
          </Menu.Item> 
         
          <Menu.Item
            name='todo'
            active={activeItem === 'todo'}
            onClick={this.handleItemClick}>
               <Link to="/home"><Button>Todo</Button></Link>
          </Menu.Item>
          
  
          <Menu.Menu position='right'>
            <Dropdown item text='Language'>
              <Dropdown.Menu>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Russian</Dropdown.Item>
                <Dropdown.Item>Spanish</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Menu.Item
            name='register'>
               <Link to="/signup"><Button color='red'>Register</Button></Link>
          </Menu.Item>
  
            <Menu.Item>
              {token ?(
              <Button onClick={this.logOut} primary>Log out</Button>
              ):(
                <a href='/login'><Button primary>Sign in</Button></a>
              )}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        </Segment>
      )
    }
  }

export default Navbar;
//<Link to="/todo">Todo</Link>
//<Link to="/login">Login</Link>