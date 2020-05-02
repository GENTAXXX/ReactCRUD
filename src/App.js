import React, { Component } from "react";
import { Container } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import ProductIndex from "./ProductIndex";

class App extends Component {
  render() {
    return (
      <Container>
        <ModalComponent text="Tambah product"/>
        <div>
          <ProductIndex/>
        </div>
      </Container>
    );
  }
}

export default App;
