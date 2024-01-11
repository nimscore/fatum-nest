/* eslint-disable prettier/prettier */
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('u')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	create(@Body() dto: CreateUserDto) {
		return this.userService.create(dto)
	}

	@Get()
	findAll() {
		return this.userService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.userService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id)
	}
}
