import React, { useState } from "react";
import API from "./API";
import { Button, Form, Modal } from "react-bootstrap";

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      error: null,
      data: {
        id: 0,
        name: "",
        description: "",
        price: "",
      },
      modalShow: false,
      isUpdate: false,
    };
  }

  componentDidMount() {
    if (this.props.id) {
      this.setState({ isUpdate: true });
      this.displayData();
    }
  }

  handleFormChange = (event) => {
    let newData = { ...this.state.data };
    newData[event.target.name] = event.target.value;
    this.setState({ data: newData });
  };

  getProduct = () => {
    API.get(`/read/${this.props.id}`)
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  displayData = () => {
    this.getProduct();
    console.log(this.state.data);
  };

  saveProduct = () => {
    let data = this.state.data;
    const options = {
      headers: { "Content-Type": "application/json" },
    };

    if (this.state.isUpdate) {
      API.put(`/update/${this.props.id}`, data, options)
        .then((res) => {
          this.setState({
            response: res.data.result,
          });
        })
        .catch((error) => {
          this.setState({ error });
        });
    } else {
      API.post("/create", data, options)
        .then((res) => {
          this.setState({
            response: res.data.result,
          });
        })
        .catch((error) => {
          this.setState({ error });
        });
    }

    this.setState({ modalShow: false });
    // let apiUrl = 'http://wayangapi.herokuapp.com/api/wayang';

    // fetch(apiUrl, {
    //     method: "POST",
    //     headers:{
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(data)
    // })
    //   .then(res => res.json())
    //   .then(result => {
    //     this.setState({
    //       response: result.result
    //     })
    //   },
    //   (error) => {
    //     this.setState({ error });
    //   }
    // )
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ modalShow: true })}>
          {this.props.text}
        </Button>
        <Modal
          size="lg"
          show={this.state.modalShow}
          onHide={() => false}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-lg">
              {this.state.isUpdate ? "Ubah " : "Tambah "}
              Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={this.state.data.name}
                  onChange={this.handleFormChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="textarea"
                  name="description"
                  placeholder="Description"
                  value={this.state.data.description}
                  onChange={this.handleFormChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={this.state.data.price}
                  onChange={this.handleFormChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={this.saveProduct}>
                Simpan
              </Button>
              &nbsp;
              <Button
                variant="secondary"
                onClick={() => this.setState({ modalShow: false })}
              >
                Batal
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;
