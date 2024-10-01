import fs from 'fs'
import path from 'path'
import { app } from './arg'
import { getNetworks } from './utils'
import createServer from './createServer'

app.on(async ([targets], flags) => {
  const paths = (targets.length === 0 ? ['.'] : targets).map((target) => {
    const targetPath = path.resolve(target)
    const exists = fs.existsSync(targetPath)
    if (!exists) {
      console.error(`Target "${target}" does not exist`)
      return process.exit(1)
    }

    const stat = fs.statSync(targetPath)
    if (!stat.isFile()) return targetPath
    return path.dirname(targetPath)
  })

  function startServer(name: string | null, host: string, port: number) {
    const { server } = createServer(...paths)
    server.listen(port, host, () => {
      const serverUrl = ['\x1b[32m', `http://${host}:${port}`, '\x1b[0m'].join(
        ''
      )

      if (!name) {
        return console.log(`Server:`, serverUrl)
      }

      console.log(`Server \x1b[36m${name}\x1b[0m:`)
      console.log(serverUrl, '\n')
    })
  }

  if (flags.host) {
    return startServer(null, flags.host, flags.port)
  }

  for (const { name, address } of getNetworks()) {
    startServer(name, address, flags.port)
  }
})
