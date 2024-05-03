import {Args, Command, Flags, ux} from '@oclif/core'
import Table from 'tty-table'
import { dump } from 'js-yaml'

export default class Explore extends Command {

  static override description = 'Get Event, Calendar or User'

  static override hiddenAliases = ["g", ""]

  static args = {
    id: Args.string(),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Explore)

    const resp = await fetch('http://localhost:3000/xrpc/app.evermeet.object.getProfile?id='+args.id)
    const data = await resp.json()
    if (data.error) {
        return console.error('XRPC Error:', data.error)
    }
    console.log(dump(data))

  }
}