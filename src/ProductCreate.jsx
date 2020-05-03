import React from "react";
import { Button, Table } from "react-bootstrap";

class ProductCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      error: null,
    };
  }

  componentDidMount() {
    const URL =
      "https://us-central1-inventory-api-70328.cloudfunctions.net/app/api";
    fetch(URL)
      .then((res) => res.json())
      .then((response) => {
        this.setState({ products: response.result });
      }),
      (error) => {
        this.setState({ error });
      };
  }

  render() {
    const { products, error } = this.state;
    console.log(products);
    if (error) {
      return <div>Error : {error.message}</div>;
    } else {
      return (
        <Table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <ModalComponent id={product.id} text="Edit" />
                  <Button onClick={() => this.deleteProduct(product.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
  }
}

export default ProductCreate;
