# inforepository

Information Repository for Organizations

## Testing the API with cURL

**Auth**:

```bash
curl -X POST http://localhost:8000/api/v1/auth/register -H 'Content-Type: application/json' -d '{"firstName": "John", "email": "john.doe@example.com", "password": "Test#1234", "lastName": "Doe", "location": "Los Angeles, CA"}'
curl -X POST http://localhost:8000/api/v1/auth/login -H 'Content-Type: application/json' -d '{"email": "john.doe@example.com", "password": "Test#1234"}'
curl -X PATCH http://localhost:8000/api/v1/auth/updateUser -H 'Content-Type: application/json' -H 'Authorization: Bearer {token}' -d '{"firstName": "Johny", "email": "johny.doe@example.com", "password": "Test#1234", "lastName": "Doe", "location": "Los Angeles, CA"}'
```

**Posts**:

```bash
curl -X POST http://localhost:8000/api/v1/posts -H 'Content-Type: application/json' -H 'Authorization: Bearer {token}' -d '{"title": "My first awesome post", "content": "What is life if full of care. We have no time to stand and stare."}'
curl http://localhost:8000/api/v1/posts
curl http://localhost:8000/api/v1/posts/stats

# 123 is a dummy id:
curl http://localhost:8000/api/v1/posts/123
curl -X DELETE http://localhost:8000/api/v1/posts/123
curl -X PATCH http://localhost:8000/api/v1/posts/123
```
