/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePostDto } from './dto/create-post.dto'
import { SearchPostDto } from './dto/search-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostEntity } from './entities/post.entity'

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(PostEntity)
		private repository: Repository<PostEntity>
	) {}

	create(dto: CreatePostDto) {
		return this.repository.save(dto)
	}

	findAll() {
		return this.repository.find({
			order: {
				createdAt: 'DESC'
			}
		})
	}

	async popular() {
		const qb = this.repository.createQueryBuilder()
		qb.orderBy('views', 'DESC')
		qb.limit(10)

		const [items, total] = await qb.getManyAndCount()

		return {
			items,
			total
		}
	}

	async search(dto: SearchPostDto) {
		const qb = this.repository.createQueryBuilder('p')
		qb.limit(dto.limit || 0)
		qb.take(dto.limit || 10)

		if (dto.views) {
			qb.orderBy('views', dto.views)
		}

		if (dto.body) {
			qb.andWhere(`p.body ILIKE :body`)
		}

		if (dto.title) {
			qb.andWhere(`p.title ILIKE :title`)
		}

		if (dto.tag) {
			qb.andWhere(`p.tag ILIKE :tag`)
		}

		qb.setParameters({
			title: `%${dto.title}%`,
			body: `%${dto.body}%`,
			tag: `%${dto.tag}%`,
			views: dto.views || ''
		})

		const [items, total] = await qb.getManyAndCount()

		return { items, total }
	}

	async findOne(id: number) {
		await this.repository
			.createQueryBuilder('posts')
			.whereInIds(id)
			.update()
			.set({
				views: () => 'views + 1'
			})
			.execute()
		return this.repository.findOneBy({ id: id })
	}

	async update(id: number, dto: UpdatePostDto) {
		const find = await this.repository.findOneBy({ id: +id })

		if (!find) {
			throw new NotFoundException('Статья не найдена')
		}
		return this.repository.update(id, dto)
	}

	async remove(id: number) {
		const find = await this.repository.findOneBy({ id: +id })

		if (!find) {
			throw new NotFoundException('Статья не найдена')
		}

		return this.repository.delete(id)
	}
}
