import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const roundsOfHashing = 8;
    const authenticated_at = req.body.authenticated ? new Date() : null;

    data?.password &&
      (data.password = await bcrypt.hash(data.password, roundsOfHashing));

    data?.cpf &&
      (data.cpf = data.cpf.replaceAll(
        /(\d{3})(\d{3})(\d{3})(\d{2})/g,
        '$1.$2.$3-$4',
      ));

    data?.phone &&
      (data.phone = data.phone.replaceAll(
        /(\d{2})(\d{5})(\d{4})/g,
        '($1) $2.$3',
      ));

    req.body = { ...data, authenticated_at };
    next();
  }
}
