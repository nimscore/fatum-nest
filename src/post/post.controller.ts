/* eslint-disable prettier/prettier */
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query
} from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { SearchPostDto } from './dto/search-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostService } from './post.service'

@Controller()
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post()
	create(@Body() createPostDto: CreatePostDto) {
		return this.postService.create(createPostDto)
	}

	@Get('/new')
	findAll() {
		return this.postService.findAll()
	}

	@Get()
	getPopularPosts() {
		return this.postService.popular()
	}

	@Get('/search')
	searchPosts(@Query() dto: SearchPostDto) {
		return this.postService.search(dto)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.postService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
		return this.postService.update(+id, updatePostDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.postService.remove(+id)
	}
}
