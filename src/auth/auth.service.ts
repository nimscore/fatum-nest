/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { UserEntity } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService
	) {}

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.userService.findByCond({
			email,
			password
		})
		if (user && user.password === password) {
			const { password, ...result } = user
			return result
		}
		return null
	}

	generateJwtToken(data: { id: number; email: string }) {
		const payload = { email: data.email, sub: data.id }
		return this.jwtService.sign(payload)
	}

	async login(user: UserEntity) {
		const { password, ...userData } = user
		return {
			...userData,
			token: this.generateJwtToken(userData)
		}
	}

	async register(dto: CreateUserDto) {
		try {
			const { password, ...userData } = await this.userService.create({
				fullName: dto.fullName,
				email: dto.email,
				password: dto.password
			})
			return {
				...userData,
				token: this.generateJwtToken(userData)
			}
		} catch (err) {
			throw new ForbiddenException('Ошибка при регистрации')
		}
	}
}
