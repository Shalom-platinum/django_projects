import React from "react";
import {Outlet} from "react-router-dom";
import SignUp from "../components/SignUp";
import Layout from "./Layout";

const Todo = () => {
    const token = sessionStorage.getItem('token')
    if (!token) {
        return (
        <div>    
          <SignUp />
        <Outlet />
        </div>

      )
    } else {
        return (
            <div>
            <Outlet />
            </div>
        )
    }
}
export default Todo;