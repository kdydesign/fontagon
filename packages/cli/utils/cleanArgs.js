module.exports = function (cmd) {
  const args = {}

  cmd.options.forEach((o) => {
    const key = o.long.replace(/^--/, '')

    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })

  return args
}
