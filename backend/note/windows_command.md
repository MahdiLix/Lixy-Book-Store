```
LOGIN SUPER ADMIN COMMAND
Invoke-RestMethod -Uri http://localhost:5000/api/admin/login `
  -Method Post `
  -Body '{"email":"super@admin.gmail.com", "password": "superSecret12345"}' `
  -ContentType "application/json"
```

REGISTER ADMIN `ONLY SUPERADMIN`

```
Invoke-RestMethod -Uri http://localhost:5000/api/admin/register `
  -Method Post `
  -Body '{"username":"admin@1","email":"admin@1.example.gmail.com","password":"AdminPass12345"}' `
  -ContentType "application/json" `
  -Headers @{ authorization = "Bearer $token" }
```

LOGIN ADMIN

```
 Invoke-RestMethod -Uri http://localhost:5000/api/admin/login `
   -Method Post `
    -Body '{"email":"admin3@example.gmail.com", "password": "AdminPass3456"}' `
    -ContentType "application/json"
```

PUT BOOK BY ADMIN

```
$body = '{"title":"GOLANGGG","availableCopies":10}'
Invoke-RestMethod -Uri http://localhost:5000/api/books/update/6a08a7bebf5645382dfda7a7 `
  -Method Put `
  -Body $body `
  -ContentType "application/json" `
  -Headers @{ Authorization = "Bearer $token" }

```

POST NEW BOOK

```
 $body = '{"title":"new title 1","author": "mahdi rad1"}'
Invoke-RestMethod -Uri http://localhost:5000/api/books/  `
  -Method Post `
  -Body $body `
  -ContentType "application/json" `
  -Headers @{ Authorization = "Bearer $token" }
```

DELETE BOOK

```
 Invoke-RestMethod -Uri http://localhost:5000/api/books/delete/6a09fdf3e8a320a2178690aa `
  -Method Delete `
  -Headers @{Authorization = "Bearer $token"}

```
