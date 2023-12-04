import { HttpException } from '@nestjs/common';

class InvalidTokenException extends HttpException {
  constructor() {
    super('유효하지 않은 토큰입니다.', 401);
  }
}

class TokenExpiredException extends HttpException {
  constructor() {
    super('토큰이 만료되었습니다', 410);
  }
}

class ManipulatedTokenNotFiltered extends HttpException {
  constructor() {
    super({ message: '토큰 암호화가 뚫렸습니다.', errorCode: 'SERVER' }, 500);
  }
}

class NeedToLoginException extends HttpException {
  constructor() {
    super('다시 로그인해주세요.', 401);
  }
}

class ForbiddenException extends HttpException {
  constructor() {
    super('권한이 없습니다', 403);
  }
}

export {
  InvalidTokenException,
  TokenExpiredException,
  ManipulatedTokenNotFiltered,
  NeedToLoginException,
  ForbiddenException,
};
