import EnvironmentVariable from './EnvironmentVariable'
import decodeEnvFile from './decodeEnvFile'
import {
  readFile as readFileCallback,
  writeFile as writeFileCallback,
  existsSync,
} from 'fs'
import path from 'path'
import { promisify } from 'util'

const readFile = promisify(readFileCallback)
const writeFile = promisify(writeFileCallback)

function fatal(message: string) {
  console.error('Fatal error! Envoy could not run.')
  console.error(message + '\n')
  process.exit(1)
}

console.log('\n🕵️  Welcome to Envoy!\n')

console.log('Running with the following values...')
const ENVOY_CONFIG_PATH =
  process.argv[2] || path.join(process.cwd(), 'envoy.config.js')

console.log('envoy.config.ts:\t', ENVOY_CONFIG_PATH)

const ENV_FILE_PATH = process.argv[3] || path.join(process.cwd(), '.env')

console.log('.env file:\t\t', ENV_FILE_PATH)

const OUTPUT_FILE_PATH = process.argv[4] || path.join(process.cwd(), '.env.ts')

console.log('.env.ts will output to:\t', OUTPUT_FILE_PATH)

console.log('\n')

if (!existsSync(ENVOY_CONFIG_PATH)) {
  fatal(
    `Tried to find an envoy.config.ts file at ${ENVOY_CONFIG_PATH} but no file was found.`
  )
}

if (!existsSync(ENV_FILE_PATH)) {
  fatal(`Tried to find a .env file at ${ENV_FILE_PATH} but no file was found.`)
}

async function importExpected() {
  try {
    const module = require(ENVOY_CONFIG_PATH)
    const expectedVars: EnvironmentVariable[] = module
    return expectedVars
  } catch (e) {
    console.error(e)
    throw new Error('Could not find or load secrets file')
  }
}

async function generate() {
  const expectedVars = await importExpected()

  const actualVars = await readFile(ENV_FILE_PATH, { encoding: 'utf-8' })

  const actualKeyValues = decodeEnvFile(actualVars)

  let outFile = ''
  for (const v of expectedVars) {
    let varValue: string | null = null
    if (typeof v !== 'string') {
      varValue = actualKeyValues[v.name]

      if (!varValue && v.isRequired) {
        console.error('❗️ Expected a variable in .env named:', v.name)
        console.error('Envoy could not successfully create your env.ts file.')
        console.error()
        process.exit(1)
      }

      if (v.validator && !v.validator(varValue)) {
        console.error(
          `Value of ${v.name} (${varValue}) did not match the expected pattern.`
        )
        process.exit(1)
      }
    } else {
    }

    const varName = typeof v !== 'string' ? v.name : v

    let value = varValue ? `"${varValue}"` : undefined

    outFile += `const ${varName} = ${value}\n`
  }
  const varNames = expectedVars.map((v) => (typeof v !== 'string' ? v.name : v))
  outFile += `export { ${varNames.join(', ')} }`

  await writeFile(OUTPUT_FILE_PATH, outFile, { encoding: 'utf-8' })
}

generate()
  .then(() =>
    console.log('✅  Created secrets file at:', OUTPUT_FILE_PATH, '\n')
  )
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
