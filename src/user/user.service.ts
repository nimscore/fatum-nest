/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { SearchUserDto } from './dto/search-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private repository: Repository<UserEntity>
	) {}
	create(dto: CreateUserDto) {
		return this.repository.save(dto)
	}

	findAll() {
		return this.repository.find()
	}

	findById(id: number) {
		return this.repository.findOneBy({ id: id })
	}

	findByCond(cond: LoginUserDto) {
		return this.repository.findOneBy(cond)
	}

	update(id: number, dto: UpdateUserDto) {
		return this.repository.update(id, dto)
	}

	async search(dto: SearchUserDto) {
		const qb = this.repository.createQueryBuilder('u')
		qb.limit(dto.limit || 0)
		qb.take(dto.limit || 10)

		if (dto.fullName) {
			qb.andWhere(`u.fullName ILIKE :fullName`)
		}

		if (dto.email) {
			qb.andWhere(`u.email ILIKE :email`)
		}

		qb.setParameters({
			fullName: `%${dto.fullName}%`,
			email: `%${dto.email}%`
		})

		const [items, total] = await qb.getManyAndCount()

		return { items, total }
	}
}
