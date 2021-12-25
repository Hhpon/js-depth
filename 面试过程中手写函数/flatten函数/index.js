const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 }
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3
}

const obj1 = {
  a: {
    b: 1
  },
  b: [1, 2, 3]
}

function isObject(obj) {
  return obj != null && (typeof obj === 'object' || typeof obj === 'function')
}

function flatten(obj) {
  if (!isObject(obj)) {
    return
  }

  const result = {}

  function dfs(cur, prefix) {

    if (isObject(cur)) {
      if (Array.isArray(cur)) {
        for (let i = 0; i < cur.length; i++) {
          dfs(cur[i], `${prefix}[${i}]`)
        }
      } else {
        for (let key in cur) {
          dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`)
        }
      }
    } else {
      result[prefix] = cur
    }
  }

  dfs(obj, '')

  return result
}

console.log(flatten(obj));
 // {
 //  'a.b': 1,
 //  'a.c': 2,
 //  'a.d.e': 5,
 //  'b[0]': 1,
 //  'b[1]': 3,
 //  'b[2].a': 2,
 //  'b[2].b': 3
 //   c: 3
 // }

