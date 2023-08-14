import React from "react"
import "../../assets/scss/Modal.scss"
import { toast } from "react-toastify"
import axios from "axios"

class Modal extends React.Component {
  state = {
    user:
      Object.keys(this.props.user).length !== 0
        ? this.props.user
        : {
            first_name: "",
            last_name: "",
            email: "",
          },
    valEmail: true,
  }
  render() {
    const user = this.props.user
    const addUser = async (user) => {
      let res = await axios
        .post("https://reqres.in/api/users", user)
        .catch(function (error) {
          toast.error("Add User Fail")
        })
      if (res.status === 201) {
        let user = { ...this.state.user, id: res.data.id }
        this.props.closeModal("success", user)
        return
      }
      this.props.closeModal("error", {})
    }

    const editUser = async (user) => {
      let res = await axios
        .put(`https://reqres.in/api/users/${this.props.user.id}`, user)
        .catch(function (error) {
          toast.error("Edit User Fail")
        })
      if (res.status === 200) {
        let user = {
          ...this.state.user,
          id: this.props.user.id,
          avatar: this.props.user.avatar,
        }
        this.props.closeModal("success", user)
        return
      }
      this.props.closeModal("error", {})
    }

    const handleClickButton = () => {
      let { first_name, last_name, email } = this.state.user
      if (!this.state.valEmail) {
        toast.error("Error Email Format")
        return
      }
      if (!first_name || !last_name || !email) {
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

    const validateEmail = (email) => {
      if (!email) return true
      let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (email.match(emailFormat)) return true
      return false
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
                defaultValue={
                  Object.keys(user).length !== 0 ? user.first_name : ""
                }
                onChange={(event) => handleOnChange(event)}
              />
            </div>
            <div className="modal-input">
              <label>Last Name:</label>
              <input
                type="text"
                name="last_name"
                defaultValue={
                  Object.keys(user).length !== 0 ? user.last_name : ""
                }
                onChange={(event) => handleOnChange(event)}
              />
            </div>
            <div className="modal-input">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                defaultValue={Object.keys(user).length !== 0 ? user.email : ""}
                onChange={(event) => {
                  if (validateEmail(event.target.value)) {
                    handleOnChange(event)
                    this.setState({ valEmail: true })
                  } else this.setState({ valEmail: false })
                }}
              />
              <span
                style={{
                  display: `${
                    this.state.valEmail === false ? "block" : "none"
                  } `,
                }}
              >
                Error Email Format
              </span>
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
              {this.props.action === "Add User" ? "Add" : "Edit"}
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
