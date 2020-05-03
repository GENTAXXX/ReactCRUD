import React, { Component } from "react";
import { Container } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import ProductIndex from "./ProductIndex";
import './App.css';

class App extends Component {
  render() {
    return (
      <Container>
        <div>
          <ModalComponent text="Tambah product" />
          <ProductIndex />
        </div>
      </Container>
    );
  }
}

export default App;
