/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommentModule } from './comment/comment.module'
import { CommentEntity } from './comment/entities/comment.entity'
import { PostEntity } from './post/entities/post.entity'
import { PostModule } from './post/post.module'
import { UserEntity } from './user/entities/user.entity'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: '77.73.132.174',
			port: 5432,
			username: 'nims',
			password: '(xH?PY%}Et}u4B',
			database: 'fatum_dev_db',
			entities: [UserEntity, PostEntity, CommentEntity],
			synchronize: true
		}),
		UserModule,
		PostModule,
		CommentModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
