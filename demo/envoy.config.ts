import { EnvoyVariableSpec } from '../'

const vars: EnvoyVariableSpec[] = [
  {
    name: 'STRIPE_KEY',
    validator: (value) => value.includes('sk_'),
  },
  'OTHER_API_KEY',
  {
    name: 'AN_OPTIONAL_KEY',
    isRequired: false,
  },
]

export default vars
