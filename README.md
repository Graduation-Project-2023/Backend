# MCQ bank auth server V1

* see env-example file to set your enviroment variables
* use an outlook instead of gmail due to gmail authentication
* the api is live at [My server here](http://151279430aaf.087cf7b7.alx-cod.online)
* concatenate the rote to the url and you are good to go
## auth routes

### `/api/auth/register`
- method => post
- @req
    ```
    * username, email are unique
    {
        "username": "rafa", 
        "email": "mo7amedraafat@aol.com",
        "password": "test"
    }
    ```
- @res
    ```
    {
        "id": "1aa3f416-75e8-4bc2-8cb5-1ca6c67cb5dd",
        "email": "mo7amedraafat@icloud.com",
        "password": "$2b$10$4PweNvwNmCEom3brknGPm..PuZf.2v98iJm1w0W93AO6p31HxRDjK",
        "username": "rafa1",
        "role": "user",
        "created_at": "2022-09-21T11:50:45.672Z",
        "updated_at": "2022-09-21T11:50:45.673Z"
    }
    ```
### `/api/auth/login`

- method => post
- @req
```
{
  "email": "mo7amedraafat@icloud.com",
  "password": "tewdsfst"
}
```
- @res [JWT token]
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhZmExIiwiZW1haWwiOiJtbzdhbWVkcmFhZmF0QGljbG91ZC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY2Mzc2MTM3OSwiZXhwIjoxNjY1MDU3Mzc5fQ.yKcA8jj7FRZlHz9TlB3InbCyaFOzLtx7dmeNVY-dzdE"
}
```

### `/api/auth/forgot_password`

- method => post 
- @req
```
{
  "email": "mo7amedraafat@icloud.com"
}
```
- @res
```
SENDS EMAIL WITH THE RESET LINK
DON'T USE FAKE MAIL!
link is valid for one time use and expires after 15 minutes
```

### `/api/auth/reset_password/:token`

- method => post
- @req
```
{
  "password": "12wwe3",
  "confpassword": "12wwe3"
}
```
- @res
```
{
    "id": "1aa3f416-75e8-4bc2-8cb5-1ca6c67cb5dd",
    "email": "mo7amedraafat@icloud.com",
    "password": "$2b$10$4PweNvwNmCEom3brknGPm..PuZf.2v98iJm1dsfdgfgrsgewterli",
    "username": "rafa1",
    "role": "user",
    "created_at": "2022-09-21T11:50:45.672Z",
    "updated_at": "2022-09-21T11:50:45.673Z"
}
```