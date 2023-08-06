import axios from "axios"
import React from "react"
import "../../assets/scss/ListUser.scss"
import { withRouter } from "../../withRouter"
import { toast } from "react-toastify"

class ListUser extends React.Component {
  state = {
    listUsers: [],
    listFind: [],
    checkFind: true,
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
    let dataUsers = this.state.checkFind
      ? this.state.listUsers
      : this.state.listFind
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
      } else {
        toast.error("Id Not Found")
        this.setState({
          checkFind: true,
        })
      }
    }

    return (
      <div className="list-user-container">
        <h1>ListUser</h1>
        <div className="list-user-content">
          <div className="content-header">
            <div className="header-search">
              <input
                type="number"
                placeholder="Search"
                onChange={(event) => {
                  handeSearch(event)
                }}
              />
            </div>
            <div className="header-option">
              <button className="btn btn-add">Add User</button>
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
                          <button className="btn btn-edit">Edit</button>
                          <button className="btn btn-delete">Delete</button>
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
                          <button className="btn btn-edit">Edit</button>
                          <button className="btn btn-delete">Delete</button>
                        </td>
                      </tr>
                    )
                  })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default withRouter(ListUser)
