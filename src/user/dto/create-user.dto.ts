/* eslint-disable prettier/prettier */
import { IsEmail, Length } from 'class-validator'

export class CreateUserDto {
	@Length(3, 12, { message: 'Имя должно быть от 3х до 12 символов' })
	fullName: string

	@IsEmail(undefined, { message: 'Неверная почта' })
	email: string

	@Length(8, 32, { message: 'Пароль минимум 8 символов' })
	password?: string
}
