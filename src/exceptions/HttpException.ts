class HttpException extends Error {
  name: string;
  status: number;
  message: string;
  stack: any;

  constructor(status: number, message: string, stack?: any, ...args: any[]) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.message = message;
    this.stack = stack;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string, stack?: any) {
    super(400, message, stack);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string, stack?: any) {
    super(401, message, stack);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string, stack?: any) {
    super(403, message, stack);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string, stack?: any) {
    super(404, message, stack);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string, stack?: any) {
    super(409, message, stack);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string, stack?: any) {
    super(500, message, stack);
  }
}

export default HttpException;
