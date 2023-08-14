import React from "react"
import { withRouter } from "../../withRouter"
import axios from "axios"
import "../../assets/scss/DetailUser.scss"
import { toast } from "react-toastify"
import { SyncLoader } from "react-spinners"

class DetailUser extends React.Component {
  state = {
    user: {},
    loading: false,
  }
  async componentDidMount() {
    this.setState({
      loading: true,
    })
    if (this.props.params && this.props.params.id) {
      let id = this.props.params.id

      let res = await axios
        .get(`https://reqres.in/api/users/${id}`)
        .catch(function (error) {
          toast.error("Not find user with id:", id)
          console.log(error)
        })

      this.setState({
        user: res && res.data && res.data.data ? res.data.data : {},
        loading: false,
      })
    }
  }
  render() {
    let { user } = this.state
    let isEmptyOjb = Object.keys(user).length === 0

    return (
      <div className="detail-user-container">
        {this.state.loading ? (
          <div style={{ marginTop: "50px" }}>
            <SyncLoader
              color={"#61dafb"}
              loading={this.state.loading}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          isEmptyOjb === false && (
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
          )
        )}
      </div>
    )
  }
}

export default withRouter(DetailUser)
