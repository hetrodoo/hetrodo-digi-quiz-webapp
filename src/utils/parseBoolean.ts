export default function (input: string): boolean {
  if (['yes', 'y', 'true', 't'].includes(input.toLowerCase())) {
    return true
  }

  if (['no', 'n', 'false', 'f'].includes(input.toLowerCase())) {
    return false
  }

  throw new Error('Unknown input value')
}
