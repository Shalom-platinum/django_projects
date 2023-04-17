import './App.css';
import React, { Component} from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Nopage from "./pages/Nopage";
import Sogin from './components/Sogin';
import SignUp from './components/SignUp';
import { Button,Table,Header, Form, Input, Container } from "semantic-ui-react";
import Navbar from './components/Navbar';


function App() {
  const token = sessionStorage.getItem('token')
  if(!token) {
    return (
      <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<Layout />} />
        <Route path="home" element={<Home />} />  
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
      </Routes>
      </BrowserRouter>
    )
  }
  else{
  return (
    <BrowserRouter>
    <Navbar />
    <Header color='teal' size='huge' textAlign='center'> Welcome to the Todo App, {sessionStorage.getItem('username')}</Header>
      <Routes>
          <Route path="home" element={<Home />} />
          <Route path="/" element={<Layout />} />  
          <Route path="signup" element={<SignUp />} />
          <Route path="todo" element={<Todo />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  )}
}

export default App;

function SignUps() {
  return <SignUp />
}