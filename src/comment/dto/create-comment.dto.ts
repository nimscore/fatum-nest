/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator'

/* eslint-disable prettier/prettier */
export class CreateCommentDto {
	@IsNotEmpty()
	postId: number

	@IsNotEmpty()
	text: string
}
