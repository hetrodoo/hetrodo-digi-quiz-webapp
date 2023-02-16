export default function (arr: unknown[]) {
  for (let i = 0; i < arr.length; i++) {
    const index = Math.floor(Math.random() * arr.length)
    const newPosition = Math.floor(Math.random() * arr.length) - 1
    const obj = arr.splice(index, 1)[0]

    arr.splice(newPosition, 0, obj)
  }
}
