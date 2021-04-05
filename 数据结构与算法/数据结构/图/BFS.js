const Graph = require("./graph")
const Queue = require("../队列/queue")
const Stack = require("../栈/stack")

const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2,
}

const initializeColor = (vertices) => {
  const color = {}
  vertices.forEach((vertex) => {
    color[vertex] = Colors.WHITE
  })
  return color
}

/**
 * adjList => adjacency list
 * @param {Graph} graph
 * @param {*} startVertex
 * @param {*} callback
 */
const breadthFirstSearch = (graph, startVertex, callback) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  const queue = new Queue()

  queue.enqueue(startVertex)

  while (!queue.isEmpty()) {
    const u = queue.dequeue()
    const neighbors = adjList.get(u)
    color[u] = Colors.GREY
    neighbors.forEach((neighbor) => {
      if (color[neighbor] === Colors.WHITE) {
        color[neighbor] = Colors.GREY
        queue.enqueue(neighbor)
      }
    })
    color[u] = Colors.BLACK
  }
}

/**
 *
 * @param {Graph} graph
 * @param {string} startVertex
 */
const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  const queue = new Queue()
  const distance = {}
  const predecessors = {}
  queue.enqueue(startVertex)

  vertices.forEach((vertex) => {
    distance[vertex] = 0
    predecessors[vertex] = null
  })

  while (!queue.isEmpty()) {
    const u = queue.dequeue()
    const neighbors = adjList.get(u)
    color[u] = Colors.GREY
    neighbors.forEach((neighbor) => {
      if (color[neighbor] === Colors.WHITE) {
        color[neighbor] = Colors.GREY
        distance[neighbor] = distance[u] + 1
        predecessors[neighbor] = u
        queue.enqueue(neighbor)
      }
    })
    color[u] = Colors.BLACK
  }
  return { distance, predecessors }
}

const graph = new Graph()

const myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]

for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i])
}

graph.addEdge("A", "B")
graph.addEdge("A", "C")
graph.addEdge("A", "D")
graph.addEdge("C", "D")
graph.addEdge("C", "G")
graph.addEdge("D", "G")
graph.addEdge("D", "H")
graph.addEdge("B", "E")
graph.addEdge("B", "F")
graph.addEdge("E", "I")

console.log(graph.toString())

breadthFirstSearch(graph, myVertices[0])

const shortestPathA = BFS(graph, myVertices[0])
console.log(shortestPathA)

const fromVertex = myVertices[0]
for (let i = 1; i < myVertices.length; i++) {
  const toVertex = myVertices[i]
  const path = new Stack()
  for (let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
    path.push(v)
  }
  let s = `${fromVertex}`
  while (!path.isEmpty()) {
    s += ` - ${path.pop()}`
  }
  console.log(s)
}
