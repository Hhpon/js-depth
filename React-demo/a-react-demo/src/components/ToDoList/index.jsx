import { Component } from "react"

export default class ToDoList extends Component {
  state = {
    list: [
      {
        name: "张三",
      },
      {
        name: "李四",
      },
      {
        name: "王五",
      },
      {
        name: "赵六",
      },
    ],
  }

  componentDidMount() {
    this.setState({
      list: this.state.list.concat([{ name: "二麻子" }]),
    })
  }

  componentDidUpdate() {
    console.log("componentDidUpdate")
  }

  componentWillUnmount() {
    console.log("willUnmount")
  }

  render() {
    return (
      <ul>
        {this.state.list.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    )
  }
}
