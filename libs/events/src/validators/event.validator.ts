import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

/**
 * Validate an event.
 * Validates the given data against the given class type.
 * @param type - The class type to validate the data against.
 * @param data - The data to validate.
 * @returns A promise that resolves to the validated data.
 */
export async function validateEvent<T>(
  type: new () => T,
  data: any,
): Promise<T> {
  const event = plainToClass(type, data);
  const errors = await validate(event as any);

  if (errors.length > 0) {
    throw new BadRequestException(errors);
  }

  return event;
}
