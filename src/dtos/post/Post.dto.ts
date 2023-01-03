import BaseValidator from '@/dtos/BaseDto';
import { IsString } from 'class-validator';

export class PostCreationObject extends BaseValidator {
  @IsString() content: string;
}
