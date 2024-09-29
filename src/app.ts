import fs from 'fs'
import path from 'path'
import { app } from './arg'

app.on(([targets]) => {
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

  console.log(paths)
})
