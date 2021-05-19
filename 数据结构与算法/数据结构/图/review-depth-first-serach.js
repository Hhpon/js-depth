const Graph = require("./graph")

/**
 *
 * @param {Graph} graph
 */
function depthFirstSearch(graph) {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initColor(vertices)

  vertices.forEach((vertex) => {
    if (color[vertex] === COLORS.WHITE) {
      depthFirstSearchVisit(vertex, color, adjList)
    }
  })
}

function depthFirstSearchVisit(vertex, color, adjList) {
  color[vertex] = COLORS.GRAY
  callBack(vertex)
  const neighbors = adjList.get(vertex)
  neighbors.forEach((neighbor) => {
    if (color[neighbor] === COLORS.WHITE) {
      depthFirstSearchVisit(neighbor, color, adjList)
    }
  })
  color[vertex] = COLORS.BLACK
}

const COLORS = {
  WHITE: "WHITE",
  GRAY: "GRAY",
  BLACK: "BLACK",
}

function initColor(array) {
  const color = {}
  array.forEach((ele) => {
    color[ele] = COLORS.WHITE
  })
  return color
}
