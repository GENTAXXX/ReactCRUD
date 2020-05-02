import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import API from "./API";

class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",
      alert: null,
      message: "",
      errors: [],
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleUpdateArticle = this.handleUpdateArticle.bind(this);
    this.hasErrorFor = this.hasErrorFor.bind(this);
    this.renderErrorFor = this.renderErrorFor.bind(this);
  }

  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    const productId = this.props.match.params.id;

    API.get(`prodcut/edit/${productId}`).then((response) => {
      this.setState({
        name: response.data.name,
        description: response.data.description,
        price: response.data.price,
      });
    });
  }

  goToHome() {
    const getAlert = () => (
      <SweetAlert
        success
        title="Success!"
        onConfirm={() => this.onSuccess()}
        onCancel={this.hideAlert()}
        timeout={2000}
        confirmBtnText="Oke Siap"
      >
        {this.state.message}
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  onSuccess() {
    this.props.history.push("/");
  }

  hideAlert() {
    this.setState({
      alert: null,
    });
  }

  handleUpdateProduct(event) {
    event.preventDefault();

    const product = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
    };

    const productId = this.props.match.params.id;

    API.put(`product/${productId}`, product).then((response) => {
      // redirect to the homepage
      var msg = response.data.success;
      if (msg == true) {
        this.setState({
          message: response.data.message,
        });
        return this.goToHome();
      }
    });
  }

  hasErrorFor(field) {
    return !!this.state.errors[field];
  }

  renderErrorFor(field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className="invalid-feedback">
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      );
    }
  }

  render() {
    const { product } = this.state;
    return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Create new project</div>
              <div className="card-body">
                <form onSubmit={this.handleUpdateProduct}>
                  <div className="form-group">
                    <label htmlFor="title">Name</label>
                    <input
                      id="title"
                      type="text"
                      className={`form-control ${
                        this.hasErrorFor("title") ? "is-invalid" : ""
                      }`}
                      name="title"
                      value={this.state.name}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor("title")}
                  </div>
                  <div className="form-group">
                    <label htmlFor="content">Description</label>
                    <textarea
                      id="content"
                      className={`form-control ${
                        this.hasErrorFor("content") ? "is-invalid" : ""
                      }`}
                      name="content"
                      rows="10"
                      value={this.state.description}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor("content")}
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Price</label>
                    <input
                      id="title"
                      type="text"
                      className={`form-control ${
                        this.hasErrorFor("title") ? "is-invalid" : ""
                      }`}
                      name="title"
                      value={this.state.price}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor("title")}
                  </div>
                  <Link className="btn btn-secondary" to={`/`}>
                    Back
                  </Link>
                  &nbsp; &nbsp;
                  <button className="btn btn-primary">Update</button>
                  {this.state.alert}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductEdit;
