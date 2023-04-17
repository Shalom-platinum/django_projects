import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import { Header,Button,Card, Image, Container } from 'semantic-ui-react';
import welcomePic from '../../src/welcomeTodo.png';

const Layout = () => {
  return (
    <div>    
        <br />
        <div className="Container">
            <Image size='large' centered fluid src={welcomePic} alt=""/>
        </div>

        <br />
        <Container>
        <div>
			<Header size='huge' textAlign='center'>Get more done, your way</Header>
			<h2>Toodledo is a flexible and multi-functional tool that will improve your productivity.</h2>
			<div class='center aligned' ><h4>Not a member yet? Try it for yourself. <i>It's free!     </i>   
			<a href="/signup">  <Button primary>Let's Get Started</Button></a></h4>
			</div>
		</div>
        </Container>
    <Outlet />
    </div>
  );
};

export default Layout;


