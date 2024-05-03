import {Args, Command, Flags, ux} from '@oclif/core'
import Table from 'tty-table'

export default class Explore extends Command {
  static override args = {
    file: Args.string({description: 'file to read'}),
  }

  static override description = 'Explore - get calendars'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override hiddenAliases = ["e", ""]

  static override flags = {
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Explore)


    const resp = await fetch('http://localhost:3000/xrpc/app.evermeet.explore.getExplore')
    const data = await resp.json()
    const t = new Table([{ value: 'did' }, { value: 'handle' }, { value: 'name' }], data.calendars.map(c => [c.did, '@'+c.handle, c.name]), { compact: true, align: 'left', borderStyle: 'none', marginTop: 0, marginLeft: 0 })
    console.log(t.render())

    return;
    
    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /Users/tree/Projects/evermeet-cli-js/src/commands/explore.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}