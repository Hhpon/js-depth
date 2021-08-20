export default function (sel, data, children, text, elm) {
  const key = data && data.key
  return { sel, data, children, text, elm, key }
}