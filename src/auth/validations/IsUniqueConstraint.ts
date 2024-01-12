/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import {
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator
} from 'class-validator'
import { EntityManager } from 'typeorm'
import { IsUniqeInterface } from './isUnique'

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
	constructor(private readonly entityManager: EntityManager) {}
	async validate(value: any, args?: ValidationArguments): Promise<boolean> {
		// catch options from decorator
		const { table, column }: IsUniqeInterface = args.constraints[0]

		// database query check data is exists
		const dataExist = await this.entityManager
			.getRepository(table)
			.createQueryBuilder(table)
			.where({ [column]: value })
			.getExists()

		return !dataExist
	}

	defaultMessage(validationArguments?: ValidationArguments): string {
		// return custom field message
		const field: string = validationArguments.property
		return `${field} уже существует`
	}
}

export function IsUnique(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsUniqueConstraint
		})
	}
}
