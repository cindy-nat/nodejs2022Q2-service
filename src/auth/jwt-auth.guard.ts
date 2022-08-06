import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
