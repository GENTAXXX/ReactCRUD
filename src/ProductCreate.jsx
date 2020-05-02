import React from "react";
import { Button } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../css/Table.css";
import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      error: null,
    };
  }

  componentDidMount() {
    const URL =
      "https://us-central1-inventory-api-70328.cloudfunctions.net/app/api/read";
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
        <div>
          {products.map((product) => (
            <div>
              <BootstrapTable key={wayang.id}>
                <TableHeaderColumn>{product.name}</TableHeaderColumn>
                <TableHeaderColumn>{product.description}</TableHeaderColumn>
                <TableHeaderColumn>{product.price}</TableHeaderColumn>
                <BootstrapTable.Footer>
                  <ModalComponent id={product.id} text="Edit" />
                  &nbsp;
                  <Button
                    variant="danger"
                    onClick={() => this.deleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </BootstrapTable.Footer>
              </BootstrapTable>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default AddForm;
