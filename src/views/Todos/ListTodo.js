import React from "react"
import AddTodo from "./AddTodo"
import "../../assets/scss/ListTodo.scss"
import { toast } from "react-toastify"

import { connect } from "react-redux"

class ListTodo extends React.Component {
  state = {
    editTodo: {},
  }

  addNewTodo = (todo) => {
    this.props.addTodo(todo)
  }

  handleOnClickDeleteTodo = (todo) => {
    this.props.deleteTodo(todo)
  }

  handleOnClickEditTodo = (todo) => {
    let editTodo = this.state.editTodo
    let isEmptyOjb = Object.keys(editTodo).length === 0
    // save
    if (isEmptyOjb === false && editTodo.id === todo.id) {
      this.setState({
        editTodo: {},
      })
      this.props.editTodo(editTodo)
      return
    }
    // edit
    this.setState({
      editTodo: todo,
    })
  }

  handleOnChangeEditTodo = (event) => {
    let valueTodo = { ...this.state.editTodo }
    valueTodo.title = event.target.value
    this.setState({
      editTodo: valueTodo,
    })
  }

  componentDidUpdate() {
    if (this.props.dataRedux.state.mess.length !== 0) {
      toast.success(this.props.dataRedux.state.mess)
      this.props.messTodo()
    }
  }

  render() {
    let listTodos = this.props.dataRedux.state.listTodos
    let editTodo = this.state.editTodo
    let isEmptyOjb = Object.keys(editTodo).length === 0
    return (
      <>
        <p>Simple todo apps use Redux</p>
        <div className="list-todo-container">
          <AddTodo addNewTodo={this.addNewTodo} />
          <div className="list-todo-content">
            {listTodos &&
              listTodos.map((item, index) => {
                return (
                  <div className="todo-chill" key={item.id}>
                    {isEmptyOjb === true ? (
                      <span>
                        {index + 1} - {item.title}
                      </span>
                    ) : editTodo.id === item.id ? (
                      <span>
                        {index + 1} -
                        <input
                          type="text"
                          value={editTodo.title}
                          onChange={(event) =>
                            this.handleOnChangeEditTodo(event)
                          }
                        />
                      </span>
                    ) : (
                      <span>
                        {index + 1} - {item.title}
                      </span>
                    )}
                    <button
                      className="btn-edit"
                      onClick={() => this.handleOnClickEditTodo(item)}
                    >
                      {isEmptyOjb === false && editTodo.id === item.id
                        ? "Save"
                        : "Edit"}
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => this.handleOnClickDeleteTodo(item)}
                    >
                      delete
                    </button>
                  </div>
                )
              })}
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataRedux: { state },
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: (todo) => {
      dispatch({ type: "DELETE_TODO", payload: todo })
    },
    addTodo: (todo) => {
      dispatch({ type: "ADD_TODO", payload: todo })
    },
    editTodo: (todo) => {
      dispatch({ type: "EDIT_TODO", payload: todo })
    },
    messTodo: () => {
      dispatch({ type: "MESS_TODO" })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTodo)
