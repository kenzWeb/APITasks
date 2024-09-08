### Полная документация API с примерами запросов

---

## Описание API

API предоставляет возможности управления пользователями, задачами и аутентификацией через JWT. Включает функции регистрации, входа, обновления токенов и работы с задачами (создание, редактирование, удаление).

---

## Аутентификация и Авторизация

### POST `/auth/login`

- **Описание**: Вход в систему с использованием email и пароля.
- **Пример запроса**:

  ```bash
  curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
  ```

- **Пример ответа**:
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

- **Описание**: Регистрация нового пользователя.
- **Пример запроса**:

  ```bash
  curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "name": "New User"
  }'
  ```

- **Пример ответа**:
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

- **Описание**: Обновление токенов с использованием refresh-токена.
- **Пример запроса**:

  ```bash
  curl -X POST http://localhost:3000/auth/login/access-token \
  --cookie "refreshToken=your_refresh_token_here"
  ```

- **Пример ответа**:
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

- **Описание**: Выход из системы. Удаление refresh-токена из cookies.
- **Пример запроса**:

  ```bash
  curl -X POST http://localhost:3000/auth/logout \
  --cookie "refreshToken=your_refresh_token_here"
  ```

- **Пример ответа**:
  ```json
  true
  ```

---

## Управление Задачами

### GET `/tasks`

- **Описание**: Получение списка задач с фильтрацией, сортировкой и пагинацией.
- **Пример запроса**:

  ```bash
  curl -X GET "http://localhost:3000/tasks?title=Task&sort={\"status\":\"asc\"}&skip=0&take=5" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
  ```

- **Пример ответа**:
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

- **Описание**: Создание новой задачи.
- **Пример запроса**:

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

- **Пример ответа**:
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

- **Описание**: Обновление задачи по ID.
- **Пример запроса**:

  ```bash
  curl -X PUT http://localhost:3000/tasks/task-id \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "description": "Updated Description",
    "status": "IN_PROGRESS"
  }'
  ```

- **Пример ответа**:
  ```json
  {
    "id": "task-id",
    "title": "Updated Task",
    "description": "Updated Description",
    "status": "IN_PROGRESS"
  }
  ```

---

### DELETE `/tasks/:id`

- **Описание**: Удаление задачи по ID.
- **Пример запроса**:

  ```bash
  curl -X DELETE http://localhost:3000/tasks/task-id \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
  ```

- **Пример ответа**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

---

## Управление Пользователями

### GET `/users`

- **Описание**: Получение списка пользователей с фильтрацией, сортировкой и пагинацией.
- **Пример запроса**:

  ```bash
  curl -X GET "http://localhost:3000/users?name=John&email=user@example.com&skip=0&take=5" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
  ```

- **Пример ответа**:
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

### GET `/users/:id`

- **Описание**: Получение данных пользователя по его ID.
- **Пример запроса**:

  ```bash
  curl -X GET http://localhost:3000/users/user-id \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
  ```

- **Пример ответа**:
  ```json
  {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "tasks": [
      {
        "id": "task-id",
        "title": "Task Title",
        "status": "PENDING"
      }
    ]
  }
  ```

---

### POST `/users`

- **Описание**: Создание нового пользователя.
- **Пример запроса**:

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

- **Пример ответа**:
  ```json
  {
    "id": "user-id",
    "name": "New User",
    "email": "newuser@example.com"
  }
  ```

---

### PUT `/users/:id`

- **Описание**: Обновление данных пользователя по ID.
- **Пример запроса**:

  ```bash
  curl -X PUT http://localhost:3000/users/user-id \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated User",
    "email": "updateduser@example.com",
    "password": "newpassword123"
  }'
  ```

- **Пример ответа**:
  ```json
  {
    "id": "user-id",
    "name": "Updated User",
    "email": "updateduser@example.com"
  }
  ```

---

### DELETE `/users/:id`

- **Описание**: Удаление пользователя по ID (только для администраторов).
- **Пример запроса**:

  ```bash
  curl -X DELETE http://localhost:3000/users/user-id \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
  ```

- **Пример ответа**:
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

---

### POST `/users/:id/avatar`

- **Описание**: Загрузка аватара пользователя.
- **Пример запроса**:

  ```bash
  curl -X POST http://localhost:3000/users/user-id/avatar \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "avatar=@/path/to/avatar.png"
  ```

- **Пример ответа**:
  ```json
  {
    "message": "Avatar uploaded successfully",
    "avatarUrl": "/uploads/avatars/avatar.png"
  }
  ```
