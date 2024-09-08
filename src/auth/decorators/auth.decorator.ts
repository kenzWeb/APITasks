import { applyDecorators, UseGuards } from '@nestjs/common';
import { Typerole } from '../auth.interface';

import { OnlyAdminGuard } from '../guards/admin.guard';
import { JwtauthGuards } from '../guards/jwt-auth.guard';

export function Auth(role: Typerole = 'user') {
  return applyDecorators(
    role === 'admin'
      ? UseGuards(JwtauthGuards, OnlyAdminGuard)
      : UseGuards(JwtauthGuards),
  );
}
