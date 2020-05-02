import React from "react";
import API from "./API";
import { Button, Card, Col, Row } from "react-bootstrap";
import ModalComponent from "./ModalComponent";

class ProductIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      error: null,
    };
  }

  componentDidMount() {
    this.getProduct();
    // const URL = "http://wayangapi.herokuapp.com/api/wayang";
    // fetch(URL)
    // .then(res => res.json())
    // .then(response => {
    //     this.setState({wayangs: response.result})
    // }),
    // (error) => {
    //     this.setState({ error });
    // }
  }

  getProduct() {
    API.get("/product")
      .then((res) => {
        this.setState({ wayangs: res.data.result });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  deleteProduct = (id) => {
    API.delete("/product/" + id)
      .then((res) => {
        this.render();
      })
      .catch((error) => {
        this.setState({ error });
      });
    this.getProduct();
    this.render();
  };

  render() {
    const { products, error } = this.state;
    if (error) {
      return <div>Error : {error.message}</div>;
    } else {
      return (
        <Row>
          {products.map((product) => (
            <Col key={product.id}>
              <Card>
                <Card.Title>{product.name}</Card.Title>
                {/* <TableHeaderColumn>{product.description}</TableHeaderColumn>
                <TableHeaderColumn>{product.price}</TableHeaderColumn> */}
                <Card.Footer>
                  <ModalComponent id={product.id} text="Edit" />
                  &nbsp;
                  <Button variant="danger" onClick={() => this.deleteProduct(product.id)}>
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      );
    }
  }
}

export default ProductIndex;
