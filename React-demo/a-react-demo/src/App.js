import { Component, useEffect, useState, useReducer } from "react"
import "./App.css"
import ToDoList from "./components/ToDoList"

// function App() {
//   const [name, setName] = useState("hhp")
//   useEffect(() => {
//     console.log("useEffect")
//     return () => {
//       console.log("useEffect return")
//     }
//   })
//   return (
//     <div className='App'>
//       <button
//         onClick={() => {
//           setName("ls")
//         }}
//       >
//         setName
//       </button>
//       <div>
//         <span style={{ color: "red" }}>{name}</span>
//       </div>
//       {/* <ToDoList></ToDoList> */}
//     </div>
//   )
// }

// export default App

// export default class App extends Component {
//   state = {
//     name: "hhp",
//   }
//   clickHandle() {
//     this.setState({
//       name: "ls",
//     })
//     debugger
//   }
//   render() {
//     return (
//       <div className='App'>
//         <button onClick={this.clickHandle.bind(this)}>setName</button>
//         <div>
//           <span style={{ color: "red" }}>{this.state.name}</span>
//         </div>
//         {/* <ToDoList></ToDoList> */}
//       </div>
//     )
//   }
// }

const initialState = { count: 0 }

function reducer(state, action) {
  console.log(state, action)
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 }
    case "decrement":
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  )
}

export default Counter
