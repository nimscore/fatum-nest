/* eslint-disable prettier/prettier */
import { IsEmail, Length } from 'class-validator'
import { isUnique } from 'src/auth/validations/isUnique'

export class CreateUserDto {
	@Length(3, 24, { message: 'Имя должно быть от 3х до 24х символов' })
	fullName: string

	@IsEmail(undefined, { message: 'Неверная почта' })
	@isUnique({ table: 'users', column: 'email' })
	email: string

	@Length(8, 32, { message: 'Пароль минимум 8 символов' })
	password?: string
}
