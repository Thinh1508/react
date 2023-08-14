import React from "react"
import "../../assets/scss/DeleteUser.scss"
import { toast } from "react-toastify"
import axios from "axios"

class DeleteUser extends React.Component {
  render() {
    const DeleteUser = async (id) => {
      let res = await axios
        .delete(`https://reqres.in/api/users/${id}`)
        .catch(function (error) {
          toast.error("Add User Fail")
        })
      if (res.status === 204) {
        this.props.close("success", id)
        return
      }
      this.props.closeModal("error", "")
    }
    return (
      <div className="delete-user">
        <div className="delete-user-container">
          <div className="delete-user-body">
            <p>Do you want delete user ?</p>
          </div>
          <hr />
          <div className="delete-user-footer">
            <button
              className="btn-delete btn-yes"
              onClick={() => DeleteUser(this.props.id)}
            >
              YES
            </button>
            <button
              className="btn-delete btn-no"
              onClick={() => this.props.close("", "")}
            >
              NO
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default DeleteUser
