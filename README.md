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

## 2. Управление Задачами

### Конечная точка: `/tasks`
**Метод:** GET  
**Описание:** Получение списка задач с возможностью фильтрации и сортировки.  
**Параметры запроса:**
- `title` (string, optional) — Фильтр по названию задачи.
- `description` (string, optional) — Фильтр по описанию задачи.
- `filter` (string, optional) — Фильтр в формате JSON. Пример: `{"status": "PENDING"}`
- `sort` (string, optional) — Сортировка в формате JSON. Пример: `{"title": "asc"}`. Возможные значения: `"asc"` для сортировки по возрастанию и `"desc"` для сортировки по убыванию.
- `skip` (number, optional) — Количество пропускаемых записей.
- `take` (number, optional) — Количество возвращаемых записей.

**Пример запроса:**
```http
GET /tasks?title=Task1&sort={"title":"asc"}&skip=0&take=10
```

**Ответ:**
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "status": "PENDING",
    "userId": "string"
  }
]
```

### Конечная точка: `/tasks`
**Метод:** POST  
**Описание:** Создание новой задачи.  
**Запрос:**
```json
{
  "title": "string",
  "description": "string",
  "status": "PENDING"
}
```
**Ответ:**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "PENDING",
  "userId": "string"
}
```

### Конечная точка: `/tasks/:id`
**Метод:** PUT  
**Описание:** Обновление существующей задачи.  
**Запрос:**
```json
{
  "title": "string",
  "description": "string",
  "status": "PENDING",
  "userId": "string" (optional)
}
```
**Ответ:**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "PENDING",
  "userId": "string"
}
```

### Конечная точка: `/tasks/:id`
**Метод:** DELETE  
**Описание:** Удаление задачи по идентификатору.  
**Ответ:** `true`

## 3. Управление Пользователями

### Конечная точка: `/users`
**Метод:** GET  
**Описание:** Получение списка пользователей с фильтрацией и сортировкой.  
**Параметры запроса:**
- `name` (string, optional) — Фильтр по имени.
- `email` (string, optional) — Фильтр по email.
- `filter` (string, optional) — Фильтр в формате JSON. Пример: `{"role": "USER"}`
- `sort` (string, optional) — Сортировка в формате JSON. Пример: `{"name": "asc"}`. Возможные значения: `"asc"` для сортировки по возрастанию и `"desc"` для сортировки по убыванию.
- `skip` (number, optional) — Количество пропускаемых записей.
- `take` (number, optional) — Количество возвращаемых записей.

**Пример запроса:**
```http
GET /users?name=John&sort={"email":"asc"}&skip=0&take=10
```

**Ответ:**
```json
[
  {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "USER",
    "avatar": "string"
  }
]
```

### Конечная точка: `/users/:id`
**Метод:** GET  
**Описание:** Получение информации о пользователе по идентификатору.  
**Ответ:**
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "role": "USER",
  "avatar": "string"
}
```

### Конечная точка: `/users`
**Метод:** POST  
**Описание:** Создание нового пользователя.  
**Запрос:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```
**Ответ:** (аналогично /users/:id GET)

**Ошибки:**
- `400 Bad Request` — Пользователь уже существует.

### Конечная точка: `/users/:id`
**Метод:** PUT  
**Описание:** Обновление информации о пользователе.  
**Запрос:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```
**Ответ:** (аналогично /users/:id GET)

### Конечная точка: `/users/:id`
**Метод:** DELETE  
**Описание:** Удаление пользователя по идентификатору.  
**Ответ:** `true`

### Конечная точка: `/users/:id/avatar`
**Метод:** POST  
**Описание:** Загрузка аватара для пользователя.  
**Запрос:** Файл загружается через multipart/form-data.  
**Ответ:**
```json
{
  "avatarUrl": "string"
}
```
**Ошибки:**
- `400 Bad Request` — Неподдерживаемый тип файла или файл не загружен.

---