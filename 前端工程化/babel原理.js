/**
 * 语法单元: 1. 数字 2. 括号 3. 标识符(变量、常量、关键字) 4. 运算符
 *
 * @param {*} code
 * @returns
 */

const tokenizer = (code) => {
  const tokens = []

  let current = 0

  while (current < code.length) {
    const char = code[current]
    if (char === "(" || char === ")") {
      tokens.push({
        type: "parens",
        value: char,
      })
      current++
      continue
    }

    if (/[a-zA-Z\$\_]/.test(char)) {
      let value = ""
      value += char
      current++
      while (current < code.length && /[a-zA-Z\$\_]/.test(code[current])) {
        value += code[current]
        current++
      }

      tokens.push({
        type: "identifier",
        value,
      })

      continue
    }

    if (/\s/.test(char)) {
      let value = ""
      value += char
      current++

      while (current < code.length && /\s/.test(code[current])) {
        value += code[current]
        current++
      }

      tokens.push({
        type: "whitespace",
        value,
      })

      continue
    }

    if (/,/.test(char)) {
      tokens.push({
        type: ",",
        value: ",",
      })

      current++
      continue
    }

    if (/=|\+|>/.test(char)) {
      let value = ""
      value += char
      current++

      while (/=|\+|>/.test(code[current])) {
        value += code[current]
        current++
      }

      if (value === "=>") {
        tokens.push({
          type: "ArrowFunctionExpression",
          value,
        })
        continue
      }

      tokens.push({
        type: "operator",
        value,
      })

      continue
    }
    console.log(char)
    throw new TypeError("I dont know what this character is: " + char)
  }

  return tokens
}

const parser = (tokens) => {
  let current = -1

  const tem = []

  let token = tokens[current]

  const parseDeclarations = () => {
    // 缓存当前指针
    setTem()

    // 指针后移
    next()

    if (token.type === "identifier" && token.value === "const") {
      const declarations = {
        type: "VariableDeclaration",
        kind: token.value,
      }

      next()

      if (token.type !== "identifier") {
        throw new Error("Exprected Variable after const")
      }

      declarations.identifierName = token.value

      next()

      // 如果跟着 “=” 那么后面应该是个表达式或者常量之类的，额外的判断代码就忽略了，直接解析函数表达式
      if (token.type === "operator" && token.value === "=") {
        declarations.init = parseFunctionExpression()
      }

      return declarations
    }
  }

  const parseFunctionExpression = () => {
    next()

    let init
    // 如果 “=” 后面跟着括号或者字符，那基本上就是一个表达式
    if ((token.type === "parens" && token.value === "(") || token.type === "identifier") {
      setTem()
      next()
      while (token.type === "identifier" || token.type === ",") {
        next()
      }

      // 如果括号后跟着箭头，那么判断是箭头函数表达式
      if (token.type === "parens" && token.value === ")") {
        next()
        if (token.type === "ArrowFunctionExpression") {
          init = {
            type: "ArrowFunctionExpression",
            params: [],
            body: {},
          }

          backTem()

          // 解析箭头函数的参数
          init.params = parseParams()

          // 解析箭头函数的函数主体
          init.body = parseExpression()
        } else {
          backTem()
        }
      }
    }

    return init
  }

  const parseParams = () => {
    const params = []
    if (token.type === "parens" && token.value === "(") {
      next()
      while (token.type !== "parens" && token.value !== ")") {
        if (token.type === "identifier") {
          params.push({
            type: token.type,
            identifierName: token.value,
          })
        }
        next()
      }
    }

    return params
  }

  const parseExpression = () => {
    next()
    let body
    while (token.type === "ArrowFunctionExpression") {
      next()
    }

    // 如果以(开头或者变量开头说明不是BlockStatement，我们以二元表达式来解析
    if (token.type === "identifier") {
      body = {
        type: "BinaryExpression",
        left: {
          type: "identifier",
          identifierName: token.value,
        },
        operator: "",
        right: {
          type: "",
          identifierName: "",
        },
      }

      next()

      if (token.type === "operator") {
        body.operator = token.value
      }

      next()

      if (token.type === "identifier") {
        body.right = {
          type: "identifier",
          identifierName: token.value,
        }
      }
    }

    return body
  }

  // 指针后移的函数
  const next = () => {
    do {
      ++current
      token = tokens[current] ? tokens[current] : { type: "eof", value: "" }
    } while (token.type === "whitespace")
  }

  // 指针缓存的函数
  const setTem = () => {
    tem.push(current)
  }

  // 指针回退函数
  const backTem = () => {
    current = tem.pop()
    token = tokens[current]
  }

  const ast = {
    type: "Program",
    body: [],
  }

  while (current < tokens.length) {
    const statement = parseDeclarations()
    if (!statement) {
      break
    }

    ast.body.push(statement)
  }

  return ast
}

const traverser = (ast, visitor) => {
  // 如果节点是数组，那么遍历数组
  const traverseArray = (array, parent) => {
    array.forEach((child) => {
      traverseNode(child, parent)
    })
  }

  // 遍历 ast 节点
  const traverseNode = (node, parent) => {
    const method = visitor[node.type]

    if (method) {
      method(node, parent)
    }

    switch (node.type) {
      case "Program":
        traverseArray(node.body, node)
        break
      case "VariableDeclaration":
        traverseArray(node.init.params, node.init)
        break
      case "identifier":
        break
      default:
        throw new TypeError(node.type)
    }
  }
  traverseNode(ast, null)
}

const transformer = (ast) => {
  // 新ast
  const newAst = {
    type: "Program",
    body: [],
  }

  // 在老ast上加一个指针指向新ast
  ast._context = newAst.body

  traverser(ast, {
    // 对于变量声明的处理方法
    VariableDeclaration: (node, parent) => {
      let functionDeclaration = {
        params: [],
      }
      if (node.init.type === "ArrowFunctionExpression") {
        functionDeclaration.type = "FunctionDeclaration"
        functionDeclaration.identifierName = node.identifierName
      }

      if (node.init.body.type === "BinaryExpression") {
        functionDeclaration.body = {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: node.init.body,
            },
          ],
        }
      }

      parent._context.push(functionDeclaration)
    },

    // 对于字符的处理方法
    identifier: (node, parent) => {
      if (parent.type === "ArrowFunctionExpression") {
        ast._context[0].params.push({
          type: "identifier",
          identifierName: node.identifierName,
        })
      }
    },
  })

  return newAst
}

const generator = (node) => {
  switch (node.type) {
    case "Program":
      return node.body.map(generator).join("\n")

    // 如果是FunctionDeclaration我们分别遍历调用其参数数组以及调用其body的属性
    case "FunctionDeclaration":
      return "function" + " " + node.identifierName + "(" + node.params.map(generator) + ")" + " " + generator(node.body)

    // 对于 “Identifier” 我们只是返回“node”的identifierName
    case "identifier":
      return node.identifierName

    // 如果是BlockStatement我们遍历调用其body数组
    case "BlockStatement":
      return "{" + node.body.map(generator) + "}"
    // 如果是ReturnStatement我们调用其argument的属性
    case "ReturnStatement":
      return "return" + " " + generator(node.argument)

    // 如果是BinaryExpression我们调用其左右节点并拼接
    case "BinaryExpression":
      return generator(node.left) + " " + node.operator + " " + generator(node.right)
    // 没有符合则报错
    default:
      throw new TypeError(node.type)
  }
}

const compiler = (input) => {
  const tokens = tokenizer(input)
  const ast = parser(tokens)
  const newAst = transformer(ast)
  const output = generator(newAst)

  return output
}

const str = "const add = (a, b) => a + b"

const result = compiler(str)

console.log(result)
