import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Create from "./Create";
// import About from "./About";
// import Contact from "./Contact";
import "./App.css";


class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1 className="title">CRUD Penyimpanan Barang</h1>
          <ul className="header">
            <li><NavLink to="/">Create</NavLink></li>
            {/* <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li> */}
          </ul>
          <div className="content">
            <Route exact path="/" component={Create} />
            {/* <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} /> */}
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;