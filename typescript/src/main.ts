import { processUsers } from './processUsers/index.js'

// eslint-disable-next-line @typescript-eslint/use-unknown-in-catch-callback-variable
processUsers().catch(console.error)
