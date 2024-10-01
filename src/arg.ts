import NoArg from 'noarg'

export const app = NoArg.create('web-server-lite', {
  listArgument: {
    name: 'Target',
    type: NoArg.string(),
    description: 'The target to run the server',
  },

  flags: {
    port: NoArg.number().default(3000),
    host: NoArg.string(),
  },
})
