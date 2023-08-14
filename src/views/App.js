import "../assets/scss/App.scss"
import Nav from "./Nav/Nav"
import Home from "./Page/Home"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import ListTodo from "./Todos/ListTodo"
import ListUser from "./User/ListUser"
import DetailUser from "./User/DetailUser"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<ListTodo />} />
            <Route path="/user" element={<ListUser />} exact={true} />
            <Route path="/user/:id" element={<DetailUser />} />
          </Routes>
        </header>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </BrowserRouter>
  )
}

export default App
