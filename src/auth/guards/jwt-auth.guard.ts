import { AuthGuard } from '@nestjs/passport';

export class JwtauthGuards extends AuthGuard('jwt') {}
