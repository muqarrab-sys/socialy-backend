import Secure from '@/helpers/Secure';
import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class Email {
  @IsEmail() private email: string;

  constructor(email: string) {
    this.email = email;
  }

  get get(): string {
    return this.email;
  }
}

export class Password {
  @IsString() @Length(8) private password: string;
  private encoded: string;

  constructor(password: string) {
    this.password = password;
  }

  get get(): string {
    return this.password;
  }

  get getEncoded(): string {
    if (!this.encoded) {
      throw new Error('Password is not encoded yet');
    }

    return this.encoded;
  }

  async encode(): Promise<string> {
    this.encoded = await Secure.hash(this.password);
    return this.encoded;
  }

  async compare(hash: string): Promise<boolean> {
    return await Secure.compare(this.password, hash);
  }
}

export class PhoneNumber {
  @IsString() @IsPhoneNumber('PK') private phone: string;

  constructor(phone: string) {
    this.phone = phone;
  }

  get get(): string {
    return this.phone;
  }
}
