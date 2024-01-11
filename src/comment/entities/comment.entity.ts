/* eslint-disable prettier/prettier */
import { PostEntity } from 'src/post/entities/post.entity'
import { UserEntity } from 'src/user/entities/user.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity('comments')
export class CommentEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	text: string

	@ManyToOne(() => UserEntity, { nullable: false })
	@JoinColumn({ name: 'userId' })
	user: UserEntity

	@ManyToOne(() => PostEntity, { nullable: false })
	@JoinColumn({ name: 'postId' })
	post: PostEntity

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date
}
