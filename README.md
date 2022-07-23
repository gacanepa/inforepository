# inforepository
Information Repository for Organizations


## Testing the API with cURL

**Auth**:

```bash
curl -X POST http://localhost:8000/api/v1/auth/register -H 'Content-Type: application/json' -d '{"firstName": "John", "email": "john.doe@example.com", "password": "Test#1234", "lastName": "Doe", "location": "Los Angeles, CA"}'
curl -X POST http://localhost:8000/api/v1/auth/login
curl -X PATCH http://localhost:8000/api/v1/auth/login
```

**Documents**:

```bash
curl -X POST http://localhost:8000/api/v1/docs
curl http://localhost:8000/api/v1/docs
curl http://localhost:8000/api/v1/docs/stats

# 123 is a dummy id:
curl http://localhost:8000/api/v1/docs/123
curl -X DELETE http://localhost:8000/api/v1/docs/123
curl -X PATCH http://localhost:8000/api/v1/docs/123 
```