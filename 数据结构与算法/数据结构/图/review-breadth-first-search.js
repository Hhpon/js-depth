const Graph = require("./graph")

const COLORS = {
  WHITE: "WHITE",
  GRAY: "GRAY",
  BLACK: "BLACK",
}

/**
 *
 * @param {Graph} graph
 */
function breadthFirstSerach(graph, startVertex, callback) {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initColor(vertices)
  const queue = []
  queue.push(startVertex)

  while (queue.length > 0) {
    const vertex = queue.shift()
    color[vertex] = COLORS.GRAY
    const neighbors = adjList.get(vertex)
    neighbors.forEach((neighbor) => {
      if (color[neighbor] === WHITE) {
        color[neighbor] = COLORS.GRAY
        queue.push(neighbor)
      }
    })

    color[vertex] = COLORS.BLACK
    callback(vertex)
  }
}

function initColor(array) {
  const color = {}
  array.forEach((ele) => {
    color[ele] = COLORS.WHITE
  })
  return color
}
