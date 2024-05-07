import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

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
