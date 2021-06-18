# KANBAN API Official Documentation

### List of Endpoints:
| HTTP METHOD | URL                 | DESKRIPSI          |
| ----------- | ------------------- | ------------------ |
| **POST**    | /api/users/register | Register User Baru |
| **POST**    | /api/users/login    | Login User |
| **POST**    | /api/users/google-login | Login User dengan google authentication |
| **POST**    | /api/tasks          | Membuat task baru |
| **GET** | /api/tasks | Mendaptkan seluruh task
| **GET** | /api/tasks/:id | Mendaptkan task berdasarkan `id` |
| **DELETE** | /api/tasks/:id | Menghapus todo berdasarkan `id` |
| **PUT** | /api/tasks/:id | Mengupdate seluruh field task berdasarkan `id` |
| **PATCH** | /api/tasks/:id | Mengupdate field category task berdasarkan `id` |
<br>
----
## Register User Baru
- HTTP Method : `POST`
- URL : `/api/users/register`
- Request Body : `json`
- Request Params : *none*
- Request Headers : *none*
- Response : `json`

#### Request Body Example
```json
{
    "email": "anton@mail.com",
    "password": "1234",
    "full_name": "Anton Prio"
}
```

#### Response Success Status : `201`

```json
{
    "message": "Success create user",
    "data": {
        "id": 1,
        "email": "anton@mail.com",
        "full_name": "Anton Prio"
    }
}
```
#### Response Error Status : `400`
```json
{
    "message": "error",
    "error": {
        "name": "SequelizeValidationError",
        "message": "Validation error: Wrong email format"
    }
}
```
#### Response Error Status : `400`
```json
{
    "message": "error",
    "error": {
        "name": "SequelizeUniqueConstraintError",
        "message": "One of the field already exists, please choose another value"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "Internal Server Error"
    }
}
```
---
## Login User
- HTTP Method : `POST`
- URL : `/api/users/login`
- Request Body : `json`
- Request Params : *none*
- Request Headers : *none*
- Response : `json`

#### Request Body Example
```json
{
    "email": "test@mail.com",
    "password": "1234"
}
```
#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbnRvbkBtYWlsLmNvbSIsImlhdCI6MTYyMzc1NzAwNn0.dJ4HBb54ZTg_RzuQF3r5SLKqtsU7dzjzuWEeW4_HmVM"
    }
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "Invalid username or password"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "Internal Server Error"
    }
}
```
---
## Login User dengan google authentication
- HTTP Method : `POST`
- URL : `/api/users/google-login`
- Request Body : `json`
- Request Params : *none*
- Request Headers : *none*
- Response : `json`

#### Request Body Example
```json
{
    "google_token": "Your token from google"
}
```
#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbnRvbkBtYWlsLmNvbSIsImlhdCI6MTYyMzc1NzAwNn0.dJ4HBb54ZTg_RzuQF3r5SLKqtsU7dzjzuWEeW4_HmVM"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "Internal Server Error"
    }
}
```
---
## Membuat task baru
- HTTP Method : `POST`
- URL : `/api/tasks`
- Request Body : `json`
- Request Params : *none*
- Request Headers : `access_token`
- Response : `json`

#### Request Body Example
```json
{
    "title": "My first task!",
    "category": "backlog",
    "task_detail": "Update coding on production"
}
```
#### Response Success Status : `201`
```json
{
    "message": "success create new task",
    "data": {
        "id": 1,
        "title": "My first task!",
        "category": "backlog",
        "user_id": 6,
        "task_detail": "Update coding on production",
        "updatedAt": "2021-06-12T11:09:31.251Z",
        "createdAt": "2021-06-12T11:09:31.251Z"
    }
}
```
#### Response Error Status : `400`
```json
{
    "message": "error",
    "error": {
        "name": "SequelizeValidationError",
        "message": "Validation error: Category must between backlog, todo, doing or done"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "Internal Server Error"
    }
}
```
---
## Mendaptkan seluruh task
- HTTP Method : `GET`
- URL : `/api/tasks`
- Request Body : *none*
- Request Params : *none*
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": [
        {
            "id": 1,
            "title": "My first tasks",
            "category": "backlog",
            "user_id": 2,
            "task_detail": "Enhancement backend for kanban server",
            "createdAt": "2021-06-18T11:57:31.060Z",
            "updatedAt": "2021-06-18T11:59:58.911Z",
            "User": {
                "id": 2,
                "email": "anton@mail.com",
                "full_name": "Anton Prio",
                "img_url": "https://ui-avatars.com/api/?name=Anton+Prio"
            }
        },
        {
            "id": 2,
            "title": "My second tasks",
            "category": "backlog",
            "user_id": 2,
            "task_detail": "Enhancement response for get task backend",
            "createdAt": "2021-06-18T12:00:42.273Z",
            "updatedAt": "2021-06-18T12:00:42.273Z",
            "User": {
                "id": 2,
                "email": "anton@mail.com",
                "full_name": "Anton Prio",
                "img_url": "https://ui-avatars.com/api/?name=Anton+Prio"
            }
        }
    ]
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "Internal Server Error"
    }
}
```
---
## Mendaptkan task berdasrkan `id`
- HTTP Method : `GET`
- URL : `/api/tasks/:id`
- Request Body : *none*
- Request Params : `id`
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "success",
    "data": {
        "id": 1,
        "title": "My first tasks",
        "category": "backlog",
        "user_id": 2,
        "task_detail": "Enhancement backend for kanban server",
        "createdAt": "2021-06-18T11:57:31.060Z",
        "updatedAt": "2021-06-18T11:59:58.911Z",
        "User": {
            "id": 2,
            "email": "anton@mail.com",
            "full_name": "Anton Prio",
            "img_url": "https://ui-avatars.com/api/?name=Anton+Prio"
        }
    }
}
```
#### Response Error Status : `404`
```json
{
    "message": "error",
    "error": {
        "name": "NotFound",
        "message": "Task not found"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "Internal Server Error"
    }
}
```

---
## Menghapus todo berdasarkan id
- HTTP Method : `DELETE`
- URL : `/api/tasks/:id`
- Request Body : *none*
- Request Params : `id`
- Request Headers : `access_token`
- Response : `json`

#### Response Success Status : `200`
```json
{
    "message": "Task with id <id> deleted",
    "data": null
}
```
#### Response Error Status : `404`
```json
{
    "message": "error",
    "error": {
        "name": "NotFound",
        "message": "Task with id <id> not found"
    }
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "You do not have permission"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "Internal Server Error"
    }
}
```
---
## Mengupdate seluruh field task berdasarkan id
- HTTP Method : `PUT`
- URL : `/api/tasks/:id`
- Request Body : `json`
- Request Params : `id`
- Request Headers : `access_token`
- Response : `json`

#### Request Body Example
```json
{
    "title": "My First Task",
    "category": "doing",
    "task_detail": "selesai mengerjakan update"
}
```
#### Response Success Status : `200`
```json
{
    "message": "success update task",
    "data": [
        {
            "id": 1,
            "title": "My First Task",
            "category": "doing",
            "user_id": 6,,
            "task_detail": "selesai mengerjakan update",
            "createdAt": "2021-06-12T11:09:31.251Z",
            "updatedAt": "2021-06-12T12:03:19.845Z"
        }
    ]
}
```
#### Response Error Status : `404`
```json
{
    "message": "error",
    "error": {
        "name": "NotFound",
        "message": "Task with id <id> not found"
    }
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "You do not have permission"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "Internal Server Error"
    }
}
```
---
## Mengupdate field category task berdasarkan id
- HTTP Method : `PATCH`
- URL : `/api/tasks/:id`
- Request Body : `json`
- Request Params : `id`
- Request Headers : `access_token`
- Response : `json`

#### Request Body Example
```json
{
    "category": "done"
}
```
#### Response Success Status : `200`
```json
{
    "message": "success update task",
    "data": [
        {
            "id": 1,
            "title": "My First Task",
            "category": "done",
            "user_id": 6,
            "createdAt": "2021-06-12T11:09:31.251Z",
            "updatedAt": "2021-06-12T12:03:19.845Z"
        }
    ]
}
```
#### Response Error Status : `404`
```json
{
    "message": "error",
    "error": {
        "name": "NotFound",
        "message": "Task with id <id> not found"
    }
}
```
#### Response Error Status : `401`
```json
{
    "message": "error",
    "error": {
        "name": "Unauthorized",
        "message": "You do not have permission"
    }
}
```
#### Response Error Status : `500`
```json
{
    "message": "error",
    "error": {
        "name": "UncaughtException",
        "message": "Internal Server Error"
    }
}
```