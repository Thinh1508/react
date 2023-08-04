import axios from "axios"
import React from "react"
import "../../assets/scss/ListUser.scss"
import { withRouter } from "../../withRouter"

class ListUser extends React.Component {
  state = {
    listUsers: [],
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
    let dataUsers = this.state.listUsers

    const handleViewDetailUser = (user) => {
      this.props.navigate(`/user/${user.id}`)
    }

    return (
      <div className="list-user-container">
        <h1>ListUser</h1>
        <div className="list-user-content">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {dataUsers &&
                dataUsers.length > 0 &&
                dataUsers.map((user, index) => {
                  return (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td onClick={() => handleViewDetailUser(user)}>
                        {user.first_name + " " + user.last_name}
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
