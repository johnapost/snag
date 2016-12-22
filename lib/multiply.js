module.exports = (number) => {
  if (typeof number !== 'number') throw new TypeError('Only numbers can be multiplied!')
  return number * 2
}
