import { Component } from "react"
import logo from "../../assets/images/logo.svg"
import "../../assets/scss/App.scss"
// import { withRouter } from "../../withRouter"

class Home extends Component {
  render() {
    return (
      <>
        <img src={logo} className="App-logo" alt="logo" />
        <div>Welcome to the Project React with Think</div>
      </>
    )
  }
}

export default Home
