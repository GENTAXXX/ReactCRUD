import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "./API";

class ProductShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    const productId = this.props.match.params.id;

    API.get(`product/${productId}`).then((response) => {
      this.setState({
        product: response.data,
      });
    });
  }

  render() {
    const { product } = this.state;

    return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Product Name: {product.name}</div>
              <div className="card-body">
                <p>{product.description}</p>
                <p>{product.price}</p>
                <Link className="btn btn-primary" to={`/`}>
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductShow;
