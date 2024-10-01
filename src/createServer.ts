import fs from 'fs'
import path from 'path'
import { Server } from 'socket.io'
import { createServer } from 'http'
import Express, { NextFunction, Request, Response } from 'express'
import updateHtmlFile from './updateHtmlFile'

export default function (...targets: string[]) {
  const app = Express()

  function controller(dir: string) {
    return (req: Request, res: Response, next: NextFunction): any => {
      const decodeUrl = decodeURI(req.url)
      if (decodeUrl.includes('..')) {
        return res.status(403).send('Forbidden')
      }

      let target = path.join(dir, decodeUrl)
      if (!fs.existsSync(target)) return next()
      if (fs.statSync(target).isDirectory()) {
        target = path.join(target, 'index.html')
      }

      if (!target.endsWith('.html')) {
        return res.sendFile(target)
      }

      const htmlContent = fs.readFileSync(target, 'utf-8')
      res.send(updateHtmlFile(htmlContent))
    }
  }

  app.use(...targets.map((target) => controller(target)))

  const server = createServer(app)
  const io = new Server(server, {})

  return { io, app, server }
}
