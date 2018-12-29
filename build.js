

const fs = require('fs')
const child_process = require('child_process')

child_process.execSync('rm -rf ./dist')
child_process.execSync('rm -rf ./.cache')
child_process.execSync('rm -rf ./vue-slide')

child_process.execSync('rollup -c')

child_process.execSync('cp ./src/index.css ./vue-slide')

child_process.execSync('cp ./README.md ./vue-slide')

const package = JSON.parse(fs.readFileSync('./package.json', {
    encoding: 'utf8'
}))

const nwePackage = {}

nwePackage.name = '@wyhaya/' + package.name
nwePackage.version = package.version
nwePackage.description = package.description
nwePackage.main = package.main
nwePackage.keywords = package.keywords
nwePackage.repository = package.repository
nwePackage.author = package.author
nwePackage.license = package.license

fs.writeFileSync('./vue-slide/package.json', JSON.stringify(nwePackage))


