import { processUsersFromService, type UserService } from '../domain/processUsersFromService.js'
import { processUsersFromRepository, type UserRepository } from '../domain/processUsersFromRepository.js'
import { printUsers, type Log } from '../domain/printUsers.js'

export async function processUsers (userRepository: UserRepository, userService: UserService, log: Log) {
	const usersFromRepository = await processUsersFromRepository(userRepository)
	const usersFromService = await processUsersFromService(userService)
	const users = usersFromRepository.concat(usersFromService)
	printUsers(users, log)
}
