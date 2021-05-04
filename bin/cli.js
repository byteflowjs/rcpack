#! /usr/bin/env node
const chalk = require('chalk');
const fs = require('fs-extra');
const Path = require('path')

const run = ([nodePath, scriptPath, ...args]) => {
  const [cmd, ...others] = args
  const dir = '../example'
  const files = [
    '.vscode/settings.json',
    '.eslintignore',
    '.eslintrc.js',
    '.prettierignore',
    '.prettierrc.js'
  ]

  const actions = files.map(file => {
    return {
      from: Path.join(__dirname, dir, file),
      dest: Path.join(process.cwd(), file),
    }
  })

  if (['build', 'create', 'generate', 'gen'].includes(cmd)){
    for (const {from, dest} of actions){
      fs.copySync(from, dest)
      console.log(chalk.green(`Created: ${dest}`))
    }
    console.log(chalk.whiteBright(`\n⚠️  ~ You may need to reload VSCode to take effect ~ ⚠️\n`))
  }

  else if (['delete', 'del', 'remove'].includes(cmd)){
    for (const {from, dest} of actions){
      fs.removeSync(dest)
      console.log(chalk.red(`Removed: ${dest}`))
    }
  }

  else {
    console.error(`Unknown command: ${cmd}`)
  }
}

run(process.argv)



