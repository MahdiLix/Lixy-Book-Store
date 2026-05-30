
// LOGIN AS ADMIN OR SUPERADMIN
```
curl -X POST http://localhost:5000/api/user/login \
   -H "Content-Type: application/json" \
   -d '{"email":"super@admin.gmail.com", "password": "SuperAdminSecret12345" }'
```

POST
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMWFjNmI5NjYwZGExMzNiMGQzOGYyNSIsImlhdCI6MTc4MDE0MDQ2MywiZXhwIjoxNzgyNzMyNDYzfQ.Nb3I6g7AXIK2accCsh54UW_34AZ3BAvYrVeIJHmwoDU" \
  -d '{"title": "Go", "author": "mahdi"}'
  
PUT
  curl -X PUT http://localhost:5000/api/books/update/9783161484100 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMGYyZThkOTY4ZTIzMGVhMzk5MmI1ZiIsImlhdCI6MTc3OTYyODc3MywiZXhwIjoxNzgyMjIwNzczfQ.UjEWsiGfAt4zNDJdYNrA6-D4Pn1GN09fR7tlMqTZm_k" \
  -d '{"title":"Updated Title","availableCopies":10}'