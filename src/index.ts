import EnvironmentVariable from './EnvironmentVariable'
import decodeEnvFile from './decodeEnvFile'
import {
  readFile as readFileCallback,
  writeFile as writeFileCallback,
} from 'fs'
import { promisify } from 'util'

const readFile = promisify(readFileCallback)
const writeFile = promisify(writeFileCallback)

const SECRETS_DEF_PATH = process.argv[0]
const ENV_FILE_PATH = process.argv[1]
const OUTPUT_FILE_PATH = process.argv[2]

async function generate() {
  const module = await import(SECRETS_DEF_PATH)
  const expectedVars: EnvironmentVariable[] = module.default

  const actualVars = await readFile(ENV_FILE_PATH, { encoding: 'utf-8' })

  const actualKeyValues = decodeEnvFile(actualVars)

  let outFile = ''
  for (const v of expectedVars) {
    let varValue: string | null = null
    if (typeof v !== 'string') {
      varValue = actualKeyValues[v.name]

      if (!varValue && v.isRequired) {
        console.error('Expected a variable in .env named:', v.name)
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

  console.log(outFile)

  await writeFile(OUTPUT_FILE_PATH, outFile, { encoding: 'utf-8' })
}

generate()
  .then(() => console.log('Created secrets file at:', OUTPUT_FILE_PATH))
  .catch((e) => {
    console.error('An unexpected error ocurred')
    console.error(e)
    process.exit(1)
  })
