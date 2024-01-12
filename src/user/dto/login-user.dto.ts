/* eslint-disable prettier/prettier */
import { IsEmail, Length } from 'class-validator'

export class LoginUserDto {
	@IsEmail(undefined, { message: 'Неверная почта' })
	email: string

	@Length(8, 32, { message: 'Пароль минимум 8 символов' })
	password?: string
}
