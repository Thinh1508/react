import { Component } from "react"
import logo from "../../assets/images/logo.svg"
import Color from "../HOC/Color"

class About extends Component {
  render() {
    return (
      <>
        <img src={logo} className="App-logo" alt="logo" />
        <div>Use HOC(Hight Order Component) </div>
      </>
    )
  }
}

export default Color(About)
