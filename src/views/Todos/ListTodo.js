import React from "react"
import AddTodo from "./AddTodo"
import "../../assets/scss/ListTodo.scss"

import { toast } from "react-toastify"

class ListTodo extends React.Component {
  state = {
    listTodos: [
      {
        id: "1",
        title: "react",
      },
      {
        id: "2",
        title: "nodejs",
      },
      {
        id: "3",
        title: "next.js",
      },
    ],
    editTodo: {},
  }

  addNewTodo = (todo) => {
    //   let currentListTodo = this.state.listTodos
    //   currentListTodo.push(todo)
    this.setState({
      listTodos: [...this.state.listTodos, todo],
      //   listTodos:currentListTodo
    })
  }

  handleOnClickDeleteTodo = (todo) => {
    let currentListTodo = this.state.listTodos
    currentListTodo = currentListTodo.filter((item) => item.id !== todo.id)
    this.setState({
      listTodos: currentListTodo,
    })

    toast.success("Delete Success")
  }

  handleOnClickEditTodo = (todo) => {
    let { editTodo, listTodos } = this.state
    let isEmptyOjb = Object.keys(editTodo).length === 0
    // save
    if (isEmptyOjb === false && editTodo.id === todo.id) {
      let newListTodos = [...listTodos]
      let ojbIndex = newListTodos.findIndex((item) => item.id === todo.id)
      newListTodos[ojbIndex].title = editTodo.title
      this.setState({
        listTodos: newListTodos,
        editTodo: {},
      })
      toast.success("Edit Success")
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

  render() {
    let { listTodos, editTodo } = this.state
    let isEmptyOjb = Object.keys(editTodo).length === 0
    return (
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
                        onChange={(event) => this.handleOnChangeEditTodo(event)}
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
                  <button onClick={() => this.handleOnClickDeleteTodo(item)}>
                    delete
                  </button>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

export default ListTodo
