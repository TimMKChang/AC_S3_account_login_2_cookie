// require secret json
const secret = require('./secret.json').secret
// require crypto
const crypto = require('crypto');

function loginHash(email) {
  // JSON Web Token（JWT）
  // header.payload.signature

  // header
  const header_jsonStr = JSON.stringify({
    "alg": "HS256",
    "typ": "JWT"
  })

  const header_base64 = Buffer.from(header_jsonStr).toString('base64')

  // payload
  const payload_jsonStr = JSON.stringify({
    "email": email
  })

  const payload_base64 = Buffer.from(payload_jsonStr).toString('base64')

  // signature
  const signature = crypto.createHmac('sha256', `${header_base64}.${payload_base64}, ${secret}`).update("json").digest("base64");

  return `${header_base64}.${payload_base64}.${signature}`

}

module.exports = loginHash