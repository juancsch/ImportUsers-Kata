import { readFile } from 'fs/promises'
import { processUsers as process } from './application/processUser.js'

const userRepository = async (filename: string, encoding: string) => await readFile(filename, encoding as BufferEncoding)

export async function processUsers (log = console.log) {
	await process(userRepository, fetch, log)
}
