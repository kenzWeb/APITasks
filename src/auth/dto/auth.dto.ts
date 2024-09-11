import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class AuthDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString({
    message: 'Почта обязательна',
  })
  @Matches(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'), {
    message: 'Неверный формат почты',
  })
  email: string;

  @MinLength(6, {
    message: 'Пароль должен содержать не менее 6 символов!',
  })
  @IsString({
    message: 'Пароль обязателен',
  })
  @Matches(
    new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,}$',
    ),
    {
      message:
        'Пароль должен содержать минимум одну цифру, одну заглавную букву, одну строчную букву и один специальный символ!',
    },
  )
  password: string;
}
