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
 *
 * @param {Graph} graph
 * @param {*} callback
 */
const depthFirstSearch = (graph, callback) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  vertices.forEach((vertex) => {
    if (color[vertex] === Colors.WHITE) {
      depthFirstSearchVisit(color, vertex, adjList)
    }

    console.log(color)
  })
}

/**
 *
 * @param {*} color
 * @param {string} vertex
 * @param {Map} adjList
 */
const depthFirstSearchVisit = (color, vertex, adjList) => {
  color[vertex] = Colors.GREY
  adjList.get(vertex).forEach((neighbor) => {
    if (color[neighbor] === Colors.WHITE) {
      console.log(neighbor)
      depthFirstSearchVisit(color, neighbor, adjList)
    }
  })
  color[vertex] = Colors.BLACK
}

/**
 *
 * @param {Graph} graph
 */
const DFS = (graph) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  const discovery = {}
  const finished = {}
  const predecessors = {}
  const timer = { count: 0 }
  vertices.forEach((vertex) => {
    discovery[vertex] = 0
    finished[vertex] = 0
    predecessors[vertex] = null
  })
  vertices.forEach((vertex) => {
    if (color[vertex] === Colors.WHITE) {
      DFSVisit(vertex, color, adjList, discovery, finished, predecessors, timer)
    }
  })
  return {
    discovery,
    finished,
    predecessors,
  }
}

/**
 *
 * @param {string} vertex
 * @param {*} color
 * @param {Map} adjList
 * @param {*} discovery
 * @param {*} finished
 * @param {*} predecessors
 * @param {*} timer
 */
const DFSVisit = (vertex, color, adjList, discovery, finished, predecessors, timer) => {
  color[vertex] = Colors.GREY
  discovery[vertex] = ++timer.count
  adjList.get(vertex).forEach((neighbor) => {
    if (color[neighbor] === Colors.WHITE) {
      predecessors[neighbor] = vertex
      DFSVisit(neighbor, color, adjList, discovery, finished, predecessors, timer)
    }
  })
  color[vertex] = Colors.BLACK
  finished[vertex] = ++timer.count
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

depthFirstSearch(graph)

console.log(DFS(graph))
