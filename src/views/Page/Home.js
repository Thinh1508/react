import { Component } from "react"
import logo from "../../assets/images/logo.svg"
import { withRouter } from "../../withRouter"

class Home extends Component {
  //   componentDidMount() {
  //     setTimeout(() => {
  //       this.props.navigate("/todos")
  //     }, 3000)
  //   }

  render() {
    return (
      <>
        <img src={logo} className="App-logo" alt="logo" />
        <div>Welcome to Homepage on Todos with Think</div>
      </>
    )
  }
}

// export default withRouter(Home)

export default Home
