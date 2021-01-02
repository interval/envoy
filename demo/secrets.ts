import EnvironmentVariable from '../src/EnvironmentVariable'

const vars: EnvironmentVariable[] = [
  {
    name: 'STRIPE_KEY',
    validator: (value: string) => value.includes('sk_'),
  },
  'OTHER_API_KEY',
  {
    name: 'AN_OPTIONAL_KEY',
    isRequired: true,
  },
]

export default vars
