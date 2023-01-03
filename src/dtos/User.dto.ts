import BaseValidator from '@/dtos/BaseDto';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsString, Length, ValidateNested } from 'class-validator';
import { Email, Password, PhoneNumber } from './DtoObjects';

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class UserCreationObject extends BaseValidator {
  @IsString() @Length(3, 20) name: string;
  @Transform(({ value }) => new Email(value)) @ValidateNested() email: Email;
  @Transform(({ value }) => new Password(value)) @ValidateNested() password: Password;
  @Transform(({ value }) => new PhoneNumber(value)) @ValidateNested() phone: PhoneNumber;
  @Type(() => Date) @IsDate() dob: Date;
  @IsString() @IsEnum(GenderEnum) gender: GenderEnum;
}

export class UserLoginObject extends BaseValidator {
  @Transform(({ value }) => new Email(value)) @ValidateNested() email: Email;
  @Transform(({ value }) => new Password(value)) @ValidateNested() password: Password;
}

export class UserUpdatePasswordObject extends BaseValidator {
  @Transform(({ value }) => new Password(value)) @ValidateNested() password: Password;
  @Transform(({ value }) => new Password(value)) @ValidateNested() newPassword: Password;
}
