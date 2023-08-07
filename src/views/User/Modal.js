import React from "react"
import "../../assets/scss/Modal.scss"
import { toast } from "react-toastify"
import axios from "axios"

class Modal extends React.Component {
  state = {
    user: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
    },
  }
  render() {
    const addUser = async (user) => {
      let res = await axios.post("https://reqres.in/api/users", user)
      if (res.status === 201) {
        let user = { ...this.state.user, id: res.data.id }
        this.props.closeModal("success", user)
        return
      }
      this.props.closeModal("error", {})
    }

    const editUser = (user) => {
      console.log("edit")
    }

    const handleClickButton = () => {
      let { first_name, last_name, email, address } = this.state.user
      if (!first_name || !last_name || !email || !address) {
        toast.error("Missing Data")
        return
      }
      if (this.props.action === "Add User") {
        addUser(this.setState.user)
      } else {
        editUser(this.setState.user)
      }
      return
    }

    const handleOnChange = (event) => {
      this.setState({
        user: { ...this.state.user, [event.target.name]: event.target.value },
      })
    }
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h1>{this.props.action}</h1>
            <span
              className="modal-close"
              onClick={() => {
                this.props.closeModal("", {})
              }}
            >
              &times;
            </span>
          </div>
          <hr />
          <div className="modal-body">
            <div className="modal-input">
              <label>First Name:</label>
              <input
                type="text"
                name="first_name"
                onChange={(event) => handleOnChange(event)}
              />
            </div>
            <div className="modal-input">
              <label>Last Name:</label>
              <input
                type="text"
                name="last_name"
                onChange={(event) => handleOnChange(event)}
              />
            </div>
            <div className="modal-input">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                onChange={(event) => handleOnChange(event)}
              />
            </div>
            <div className="modal-input">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                onChange={(event) => handleOnChange(event)}
              />
            </div>
          </div>
          <hr />
          <div className="modal-footer">
            <button
              className={
                this.props.action === "Add User"
                  ? "btn btn-add"
                  : "btn btn-edit"
              }
              onClick={() => handleClickButton()}
            >
              Add
            </button>
            <button
              className="btn"
              onClick={() => {
                this.props.closeModal("", {})
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
