class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected
    this.vertices = []
    this.adjList = new Map()
  }

  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v)
      this.adjList.set(v, [])
    }
  }

  addEdge(v, w) {
    if (!this.adjList.get(v)) {
      this.addVertex(v)
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w)
    }
    this.adjList.get(v).push(w)
    if (!this.isDirected) {
      this.adjList.get(w).push(v)
    }
  }
  getVertices() {
    return this.vertices
  }
  getAdjList() {
    return this.adjList
  }
  toString() {
    let s = ""
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `
      this.adjList.get(this.vertices[i]).forEach((neighbor) => {
        s += `${neighbor} `
      })
      s += "\n"
    }
    return s
  }
}

module.exports = Graph

// const graph = new Graph()

// const myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]

// for (let i = 0; i < myVertices.length; i++) {
//   graph.addVertex(myVertices[i])
// }

// graph.addEdge("A", "B")
// graph.addEdge("A", "C")
// graph.addEdge("A", "D")
// graph.addEdge("C", "D")
// graph.addEdge("C", "G")
// graph.addEdge("D", "G")
// graph.addEdge("D", "H")
// graph.addEdge("B", "E")
// graph.addEdge("B", "F")
// graph.addEdge("E", "I")

// console.log("********* printing graph ***********")

// console.log(graph.toString())
