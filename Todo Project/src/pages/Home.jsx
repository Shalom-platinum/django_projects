import Login from './Login';
import { useLocation } from 'react-router';
import React, { Component } from 'react';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';
import { Button,Table, Form,Input, Container, TextArea } from "semantic-ui-react";
import Sogin from './Login';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/


class App extends Component  {
  constructor(props, context){
    super(props, context);
    this.createTodos = this.createTodos.bind(this);
    this.deleteTodos = this.deleteTodos.bind(this);
    this.statusTodos = this.statusTodos.bind(this);
    
  }
  
  state = {
    author: "",
    todos: [],
    num: "",
    id: '',
    title: "",
    refresh:"",
    body: "",
    status: true
  };  

  componentDidMount() {
    this.getTodos();
  };


  getTodos = (e) => {
    const token = sessionStorage.getItem('token')
    const headers ={
        Authorization: "Token "+sessionStorage.getItem('token')
    }
    axios
      .get('http://127.0.0.1:8000/api/', {headers:headers})
      .then( 
        (res) => {
        this.setState({ todos: res.data })
      })
      .catch(err => {
        console.log(err);
      });
  }


  createTodos= (e) => {
    

    e.preventDefault();
    const { title, body } = this.state;
    const authorID = sessionStorage.getItem('user_id')
    //const body = { title, description };
    const headers ={
        Authorization: "Token "+sessionStorage.getItem('token')
    }

    axios
    .post("http://127.0.0.1:8000/api/create/", {
      title: title,
      author: authorID,
      body: body,
    }, {headers: headers} )
    .then(
      this.getTodos,
      this.setState({ title:"" }),
      this.setState({ body:"" }),
      (response) => {
      console.log(response.status)})
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

  deleteTodos = async (e) => {
    const ids = e.target.id;
    const iden = this.state.todos[ids].id;
    const headers ={
        Authorization: "Token "+sessionStorage.getItem('token')
    }
    axios
      .delete("http://127.0.0.1:8000/api/" + iden + "/delete/",{headers:headers}) 
      .then(
        this.getTodos,
      )
      .catch(err => {
        console.log(err.response.data)
      });
  } 

  refreshPage() {
    window.location.reload(false);
  }

  statusTodos = (e) => {
    const ids = e.target.id;
    const status = (e.target.value == 'true');
    const iden = this.state.todos[ids].id;
    const title = this.state.todos[ids].title;
    const body = this.state.todos[ids].body;
    const author = this.state.todos[ids].author;
    const headers ={
        Authorization: "Token "+sessionStorage.getItem('token')
    };    

    axios
      .put("http://127.0.0.1:8000/api/" + iden + "/status/", { title,body,author, status:(!status) }, {headers:headers})
      .then(
        this.getTodos,
        res => {
        this.setState({ todos: res.data })
        
      })
      .catch(err => {
        console.log(err);
      })
  };

  theBody() {
    const { Row, Header, HeaderCell, Body, Cell } = Table;
      return this.state.todos.map((item, index) => {
        return (
          <Row key={item.id}>
          <Cell>{item.id}</Cell>
          <Cell><h2>{item.title}</h2>{item.body}</Cell>
          {item.status ? (
          <Cell id={index}>Completed</Cell>
          ): (
            <Cell id={index}>In progress</Cell>
          )}
          <Cell><Button id={index} value={index} onClick={this.statusTodos} color='blue'>Finish</Button></Cell>
  
          <Cell><Button id={index} value={index} onClick={this.deleteTodos} color='red'>Delete</Button></Cell>
          </Row>
          )}
      )
    };

  

  render() {
    const { Row, Header, HeaderCell, Body, Cell } = Table;
    const iden = this.state.status;
    const token = sessionStorage.getItem('token')

    if (!token) {
      return (<Sogin />)}
      else{
      return (
      <Container style={{ marginTop:50 }}>
        <div>
          <Form onSubmit={this.createTodos} style={{ marginBottom:10 }}>
            <div className="field twelve wide">
            <Input size='big' icon='tasks' value={this.state.title} onChange={event => this.setState({ title: event.target.value })} placeholder='Enter your task Title' label="Title"></Input>
            </div>
            <div className="">
            <Input fluid value={this.state.body} icon='comment alternate' size='large' type='text' onChange={event => this.setState({ body: event.target.value })} placeholder="Enter your task description"></Input>
            </div>
            <Button floated='right' size='large' color='teal' onClick={this.createTodos} style={{ marginTop:10, marginBottom:10 }}>Save</Button>
          </Form>
        </div>
      <div>
        <Table>
        <Header>
          <Row>
            <HeaderCell>
              No.
            </HeaderCell>
            <HeaderCell>
              Todo Item
              </HeaderCell>
            <HeaderCell>
              Status
            </HeaderCell>
            <HeaderCell>
              Actions
            </HeaderCell>
          </Row>
        </Header>
                    
          <Body>
            {this.state.refresh}
          {this.state.todos.map((item, index) => {
            console.log()
            return(
          <Row key={item.id}>
            
          <Cell>{index +1}</Cell>
          <Cell><h2>{item.title}</h2>{item.body}</Cell>
          {item.status ? (
          <Cell id={index}>Completed</Cell>
          ): (
            <Cell id={index}>In progress</Cell>
          )}
          {item.status ? (
          <Cell><Button id={index} value={this.state.status} onClick={this.statusTodos} color='blue'>Undo Finish Task</Button></Cell>
          ): (
            <Cell><Button id={index} value={""} onClick={this.statusTodos} color='blue'>Finish Task</Button></Cell>
            )}
          <Cell><Button id={index} value={index} onClick={this.deleteTodos} color='red'>Delete</Button></Cell>
          </Row>)
          })}
          
        </Body>
        </Table>
        <Button color='teal' onClick={this.getTodos}>Get Your Todos</Button>
        
      </div>
      </Container>
    )}
  }
}

export default App;
