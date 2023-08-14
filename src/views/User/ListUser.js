import axios from "axios"
import React from "react"
import "../../assets/scss/ListUser.scss"
import { withRouter } from "../../withRouter"
import { toast } from "react-toastify"
import Modal from "./Modal"
import DeleteUser from "./DeleteUser"

class ListUser extends React.Component {
  state = {
    listUsers: [],
    listFind: [],
    checkFind: true,
    modal: false,
    user: {},
    mess: "",
    action: "",
    deleteUser: false,
  }

  async componentDidMount() {
    // axios.get("https://reqres.in/api/users?page=1").then((res) => {
    //   console.log("check res", res)
    // })

    let res = await axios.get("https://reqres.in/api/users?page=1")
    this.setState({
      listUsers: res && res.data && res.data.data ? res.data.data : [],
    })
  }

  render() {
    const handleViewDetailUser = (user) => {
      this.props.navigate(`/user/${user.id}`)
    }

    const handeSearch = (event) => {
      let listUser = this.state.listUsers
      listUser = listUser.find(
        (item) => parseInt(item.id) === parseInt(event.target.value)
      )
      if (typeof listUser !== "undefined") {
        this.setState({
          listFind: [listUser],
          checkFind: false,
        })
        return
      }
      if (event.target.value) {
        toast.error("Id Not Found")
        this.setState({
          checkFind: true,
        })
        return
      }

      this.setState({
        checkFind: true,
      })
      return
    }

    const closeModal = (mess, user) => {
      if (mess.length === 0) {
        this.setState({
          modal: false,
          mess: mess,
        })
        return
      }
      if (Object.keys(user).length !== 0) {
        if (this.state.action === "Add User") {
          this.setState({
            listUsers: [...this.state.listUsers, user],
            user: {},
          })
        } else {
          let newListUsers = this.state.listUsers
          let ojbIndex = newListUsers.findIndex((item) => item.id === user.id)
          newListUsers[ojbIndex] = user
          this.setState({
            listTodos: newListUsers,
            user: {},
          })
        }
        this.setState({
          modal: false,
          mess: mess,
        })
        toast.success(this.state.action + " Success")
        return
      }
      this.setState({
        modal: false,
        mess: mess,
      })
      toast.error(this.state.action + " Fail")
    }

    const deleteUser = (mess, id) => {
      if (mess.length === 0) {
        this.setState({
          deleteUser: false,
        })
        return
      }
      if (id.length !== 0) {
        let listUsers = this.state.listUsers
        listUsers = listUsers.filter((item) => item.id !== id)
        toast.success("Delete Success")
        this.setState({
          listUsers: listUsers,
          deleteUser: false,
          checkFind: true,
        })
        return
      }
      toast.error("Delete Fail")
      this.setState({
        deleteUser: false,
      })
      return
    }

    return (
      <div className="list-user-container">
        <h1>ListUser</h1>
        <div className="list-user-content">
          <div className="content-header">
            <div className="header-search">
              <input
                type="number"
                min={0}
                onKeyPress={(event) => {
                  if (event.key === "-" || event.key === "e") {
                    event.preventDefault() // Ngăn chặn nhập các ký tự "-" và "e"
                  }
                }}
                onInput={(event) => {
                  const value = event.target.value
                  if (value < 0) {
                    event.target.value = 0 // Nếu giá trị nhỏ hơn 0, đặt lại giá trị là 0
                  }
                }}
                placeholder="Search"
                onChange={(event) => {
                  handeSearch(event)
                }}
              />
            </div>
            <div className="header-option">
              <button
                className="btn btn-add"
                onClick={() => {
                  this.setState({
                    user: {},
                    modal: true,
                    action: "Add User",
                  })
                }}
              >
                Add User
              </button>
              <button className="btn btn-edit">Import</button>
              <button className="btn btn-delete">Export</button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.checkFind
                ? this.state.listUsers &&
                  this.state.listUsers.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td onClick={() => handleViewDetailUser(user)}>
                          {user.first_name + " " + user.last_name}
                        </td>
                        <td>
                          <button
                            className="btn btn-edit"
                            onClick={() => {
                              this.setState({
                                modal: true,
                                user: user,
                                action: "Edit User",
                              })
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => {
                              this.setState({ deleteUser: true, user: user })
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })
                : this.state.listFind &&
                  this.state.listFind.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td onClick={() => handleViewDetailUser(user)}>
                          {user.first_name + " " + user.last_name}
                        </td>
                        <td>
                          <button
                            className="btn btn-edit"
                            onClick={() => {
                              this.setState({
                                modal: true,
                                user: user,
                                action: "Edit User",
                              })
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => {
                              this.setState({ deleteUser: true, user: user })
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })}
            </tbody>
          </table>
        </div>
        {this.state.modal && (
          <Modal
            user={this.state.user}
            closeModal={closeModal}
            action={this.state.action}
          />
        )}
        {this.state.deleteUser && (
          <DeleteUser close={deleteUser} id={this.state.user.id} />
        )}
      </div>
    )
  }
}

export default withRouter(ListUser)
