module.exports = (request, response) => {
  response.send(new Date().toString())
}