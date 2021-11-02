// 输出 
// 1 <div>
//   1.1 
//     1.1.1 
// 2 
//   2.1

const props = [
  {
    "key": "1",
    "name": "1",
    "children": [
      {
        "key": "1.1",
        "name": "1.1",
        "children": [
          {
            "key": "1.1.1",
            "name": "1.1.1"
          }
        ]
      }
    ]
  },
  {
    "key": "2",
    "name": "2",
    "children": [
      {
        "key": "2.1",
        "name": "2.1"
      }
    ]
  }
]

function printName(props) {
  let text = ''
  function formatText(children) {
    for (let child of children) {
      text = text + child.name + '</div>'
      child.children && formatText(child.children)
    }
  }
  formatText(props)
  return text
}

console.log(printName(props))

