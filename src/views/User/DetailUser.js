import React from "react"
import { withRouter } from "../../withRouter"
import axios from "axios"
import "../../assets/scss/DetailUser.scss"

class DetailUser extends React.Component {
  state = {
    user: {},
  }
  async componentDidMount() {
    if (this.props.params && this.props.params.id) {
      let id = this.props.params.id

      let res = await axios.get(`https://reqres.in/api/users/${id}`)

      this.setState({
        user: res && res.data && res.data.data ? res.data.data : {},
      })
    }
  }
  render() {
    let { user } = this.state
    let isEmptyOjb = Object.keys(user).length === 0

    return (
      <div className="detail-user-container">
        {isEmptyOjb === false && (
          <>
            <img src={user.avatar} alt={user.first_name} />
            <div>
              <h1>{user.first_name + " " + user.last_name}</h1>
              <p>{user.email}</p>
            </div>
            <span onClick={() => this.props.navigate(`/user`)}>
              <u>Back</u>
            </span>
          </>
        )}
      </div>
    )
  }
}

export default withRouter(DetailUser)
