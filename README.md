```markdown
# API Документация

Документацию API, предоставляющую функциональность для управления пользователями, задачами и аутентификацией через JWT.

## Содержание
1. [Аутентификация и Авторизация](#аутентификация-и-авторизация)
    - [POST /auth/login](#post-authlogin)
    - [POST /auth/register](#post-authregister)
    - [POST /auth/login/access-token](#post-authloginaccess-token)
    - [POST /auth/logout](#post-authlogout)
2. [Управление Задачами](#управление-задачами)
    - [GET /tasks](#get-tasks)
    - [POST /tasks](#post-tasks)
    - [PUT /tasks/:id](#put-tasksid)
    - [DELETE /tasks/:id](#delete-tasksid)
3. [Управление Пользователями](#управление-пользователями)
    - [GET /users](#get-users)
    - [POST /users](#post-users)
    - [GET /users/:id](#get-usersid)
    - [PUT /users/:id](#put-usersid)
    - [DELETE /users/:id](#delete-usersid)
    - [POST /users/:id/avatar](#post-usersidavatar)

---

## Аутентификация и Авторизация

### POST `/auth/login`
**Описание**: Вход в систему с использованием email и пароля.

**Пример запроса**:
```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "user@example.com",
  "password": "password123"
}'
```

**Пример ответа**:
```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com"
  },
  "accessToken": "JWT_ACCESS_TOKEN",
  "refreshToken": "JWT_REFRESH_TOKEN"
}
```

---

### POST `/auth/register`
**Описание**: Регистрация нового пользователя.

**Пример запроса**:
```bash
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User"
}'
```

**Пример ответа**:
```json
{
  "user": {
    "id": "user-id",
    "email": "newuser@example.com"
  },
  "accessToken": "JWT_ACCESS_TOKEN",
  "refreshToken": "JWT_REFRESH_TOKEN"
}
```

---

### POST `/auth/login/access-token`
**Описание**: Обновление токенов с использованием refresh-токена.

**Пример запроса**:
```bash
curl -X POST http://localhost:3000/auth/login/access-token \
--cookie "refreshToken=your_refresh_token_here"
```

**Пример ответа**:
```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com"
  },
  "accessToken": "JWT_ACCESS_TOKEN",
  "refreshToken": "JWT_REFRESH_TOKEN"
}
```

---

### POST `/auth/logout`
**Описание**: Выход из системы и удаление refresh-токена.

**Пример запроса**:
```bash
curl -X POST http://localhost:3000/auth/logout \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Пример ответа**:
```json
{
  "message": "Logout successful"
}
```

---

## Управление Задачами

### GET `/tasks`
**Описание**: Получение списка задач с фильтрацией, сортировкой и пагинацией.

**Пример запроса**:
```bash
curl -X GET "http://localhost:3000/tasks?title=Task&sort={\"status\":\"asc\"}&skip=0&take=5" \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Пример ответа**:
```json
[
  {
    "id": "task-id",
    "title": "Task Title",
    "description": "Task Description",
    "status": "PENDING"
  }
]
```

---

### POST `/tasks`
**Описание**: Создание новой задачи.

**Пример запроса**:
```bash
curl -X POST http://localhost:3000/tasks \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "title": "New Task",
  "description": "Task Description",
  "status": "PENDING"
}'
```

**Пример ответа**:
```json
{
  "id": "task-id",
  "title": "New Task",
  "description": "Task Description",
  "status": "PENDING"
}
```

---

### PUT `/tasks/:id`
**Описание**: Обновление задачи по ID.

**Пример запроса**:
```bash
curl -X PUT http://localhost:3000/tasks/task-id \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "status": "IN_PROGRESS"
}'
```

**Пример ответа**:
```json
{
  "id": "task-id",
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "status": "IN_PROGRESS"
}
```

---

### DELETE `/tasks/:id`
**Описание**: Удаление задачи по ID.

**Пример запроса**:
```bash
curl -X DELETE http://localhost:3000/tasks/task-id \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Пример ответа**:
```json
{
  "message": "Task deleted successfully"
}
```

---

## Управление Пользователями

### GET `/users`
**Описание**: Получение списка пользователей с фильтрацией, сортировкой и пагинацией.

**Пример запроса**:
```bash
curl -X GET "http://localhost:3000/users?name=John&email=user@example.com&skip=0&take=5" \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Пример ответа**:
```json
[
  {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
]
```

---

### POST `/users`
**Описание**: Создание нового пользователя.

**Пример запроса**:
```bash
curl -X POST http://localhost:3000/users \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "password123"
}'
```

**Пример ответа**:
```json
{
  "id": "user-id",
  "name": "New User",
  "email": "newuser@example.com"
}
```

---

### GET `/users/:id`
**Описание**: Получение данных пользователя по ID.

**Пример запроса**:
```bash
curl -X GET http://localhost:3000/users/user-id \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Пример ответа**:
```json
{
  "id": "user-id",
  "name": "John Doe",
  "email": "john@example.com",
  "tasks": []
}
```

---

### PUT `/users/:id`
**Описание**: Обновление данных пользователя по ID.

**Пример запроса**:
```bash
curl -X PUT http://localhost:3000/users/user-id \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "name": "Updated User Name",
  "email": "updateduser@example.com",
  "password": "newpassword123"
}'
```

**Пример ответа**:
```json
{
  "id": "user-id",
  "name": "Updated User Name",
  "email": "updateduser@example.com"
}
```

---

### DELETE `/users/:id`
**Описание**: Удаление пользователя по ID.

**Пример запроса**:
```bash
curl -X DELETE http://localhost:3000/users/user-id \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Пример ответа**:
```json
{
  "message": "User deleted successfully"
}
```

---

### POST `/users/:id/avatar`
**Описание**: Загрузка аватара пользователя.

**Пример запроса**:
```bash
curl -X POST http://localhost:3000/users/user-id/avatar \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-F "avatar=@/path/to/avatar.png"
```

**Пример ответа**:
```json
{
  "message": "Avatar uploaded successfully",
  "avatarUrl": "/uploads/avatars/avatar.png"
}
```

---

## Лицензия
[MIT](LICENSE)
```

Этот шаблон готов к копированию в файл `README.md` и автоматически будет отображаться в правильном стиле при просмотре на платформах, поддерживающих Markdown, таких как GitHub или другие системы управления версиями.