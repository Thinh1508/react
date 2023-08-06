const initState = {
  listTodos: [
    {
      id: "1",
      title: "react1",
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
  mess: "",
}

const rootReducer = (state = initState, action) => {
  let mess
  switch (action.type) {
    case "DELETE_TODO":
      let listTodos = state.listTodos
      listTodos = listTodos.filter((item) => item.id !== action.payload.id)
      mess = "Delete Success"
      return {
        ...state,
        listTodos,
        mess,
      }
    case "ADD_TODO":
      mess = "Add Success"
      return {
        ...state,
        listTodos: [...state.listTodos, action.payload],
        mess,
      }
    case "EDIT_TODO":
      let newListTodos = state.listTodos
      let ojbIndex = newListTodos.findIndex(
        (item) => item.id === action.payload.id
      )
      newListTodos[ojbIndex].title = action.payload.title
      mess = "Edit Success"
      return {
        ...state,
        listTodos: newListTodos,
        mess,
      }
    case "MESS_TODO":
      return {
        ...state,
        mess: "",
      }
    default:
      return state
  }
}

export default rootReducer
