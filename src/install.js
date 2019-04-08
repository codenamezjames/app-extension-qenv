/**
 * Quasar App Extension install script
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/InstallAPI.js
 */
const fs = require('fs-extra')

module.exports = function (api) {
  api.render('./templates', {})

  const envName = 'env/production.js'

  // adding env/production.js to .gitignore
  const gitignorePath = api.resolve.app('.gitignore')
  // read .gitignore
  let buffer = fs.readFileSync(gitignorePath, 'utf8')
  // convert to array
  let data = buffer.split('\n')
  // See if the .quasar.env.js file already exists in .gitignore
  if (!data.includes(envName)) {
    data.push(envName)
  }
  // rejoin array to string
  data = data.join('\n')
  // convert to buffer
  buffer = Buffer.from(data)
  // write .gitignore
  fs.writeFileSync(gitignorePath, buffer, 'utf8')
}
