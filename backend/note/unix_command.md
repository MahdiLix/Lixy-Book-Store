## you can test server CRUD in bash with this unix command:

 LOGIN AS ADMIN OR SUPERADMIN

```
curl -X POST http://localhost:5000/api/user/login \
   -H "Content-Type: application/json" \
   -d '{"email":"super@admin.gmail.com", "password": "SuperAdminSecret12345" }'
```

POST
```
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer  <YOUR_TOKEN> " \
  -d '{"title": "Go", "author": "mahdi"}'
```

PUT
```
  curl -X PUT http://localhost:5000/api/books/update/9783161484100 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN> " \
  -d '{"title":"Updated Title","availableCopies":10}'
```

DELETE
``` 
 curl -X DELETE http://localhost:5000/api/books/delete \
  -H "Content-Type: application/json"
  -H "Authorization: Bearer <YOUR_TOKEN>" 

```