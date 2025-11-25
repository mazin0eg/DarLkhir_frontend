# Darlkhir Platform - Consolidated API Endpoints

This file lists the main HTTP endpoints for the Darlkhir platform services (Auth, Darna, Tirelire). Use these from your React frontend.

---

## 1) Auth Service (cenTirelire Daret API

 1.0.0 

OAS 3.0

API documentation for Tirelire Daret - Group savings platform
Contact API Support
Servers
No operations defined in spec!tralized)
Base URL: `http://localhost:3001/api/v1/auth`

Endpoints:

- GET /api/v1/auth/
  - Description: Health / root endpoint
  - Auth: none

- POST /api/v1/auth/register
  - Description: Register a new user
  - Body (application/json): { email, password, confirmPassword, firstName, lastName }
  - Response: success + user (and email verification request)

- POST /api/v1/auth/login
  - Description: Login user
  - Body: { email, password }
  - Response: success + { user, token }

- GET /api/v1/auth/google
  - Description: Redirect to Google OAuth (if configured)
  - Auth: none

- GET /api/v1/auth/google/callback
  - Description: Google OAuth callback
  - Auth: none (internal redirect)

- POST /api/v1/auth/verify
  - Description: Verify JWT token (used by other services)
  - Headers: Authorization: Bearer <token>
  - Response: { valid: true, user }

- POST /api/v1/auth/validate
  - Description: Validate email (token)
  - Body: { token }

- POST /api/v1/auth/message/validate
  - Description: Request verification email to be sent
  - Body: { email }

- POST /api/v1/auth/reset
  - Description: Reset password with token
  - Body: { token, password, confirmPassword }

- POST /api/v1/auth/message/reset
  - Description: Request password-reset email
  - Body: { email }

- (Optional) POST /api/v1/auth/refresh
  - Description: Refresh access token (if implemented)

---

## 2) Darna Service
Base URL: `http://localhost:3000/api`
Docs: Swagger UI available at `http://localhost:3000/api/docs` (if running)

Authentication: Darna forwards authentication to the Auth Service. Use the Auth JWT for protected endpoints.

Key endpoints (reverse-proxied auth + domain APIs):

### Auth / SSO (proxy)
- GET /api/auth-proxy/login
  - Description: Informational proxy; returns auth service URL to forward credentials to

- POST /api/auth/login
  - Description: (Local route) Proxy to auth service login — forwards body to `http://localhost:3001/api/v1/auth/login`
  - Body: { email, password }

- POST /api/auth/register
  - Description: Proxy to auth service register
  - Body: { email, password, confirmPassword, firstName, lastName }

- GET /api/auth/google
  - Description: Redirects to `http://localhost:3001/api/v1/auth/google`

### Entreprises
Base: `/api/entreprises`
- GET /api/entreprises
  - Auth: Bearer token required
  - Description: List entreprises

- GET /api/entreprises/:id
  - Auth: Bearer token
  - Description: Get entreprise details

- POST /api/entreprises
  - Auth: Bearer token
  - Body: Entreprise object
  - Description: Create entreprise

- PATCH /api/entreprises/:id
  - Auth: Bearer token
  - Description: Update entreprise

- DELETE /api/entreprises/:id
  - Auth: Bearer token
  - Description: Delete entreprise

- GET /api/entreprises/:id/employees
  - Auth: Bearer
  - Description: List employees

- POST /api/entreprises/:id/employees
  - Auth: Bearer
  - Body: user object
  - Description: Add employee

- PATCH /api/entreprises/:id/employees/:employeeId
  - Auth: Bearer
  - Description: Update employee

- DELETE /api/entreprises/:id/employees/:employeeId
  - Auth: Bearer
  - Description: Remove employee

### Properties (Annonces)
Base: `/api/annonces`
- POST /api/annonces
  - Auth: Bearer token
  - Description: Create property

- PATCH /api/annonces/:id
  - Auth: Bearer token
  - Description: Update property

- DELETE /api/annonces/:id
  - Auth: Bearer token
  - Description: Delete property

---

## 3) Tirelire Service
Base URL: `http://localhost:3002`
Swagger UI: `http://localhost:3002/api/docs`

Authentication: Tirelire is configured in SSO mode and forwards auth requests to the Auth Service. Use the Auth JWT token for protected endpoints.

Common endpoints (SSO-forwarded and local domain endpoints):

### Auth (SSO forwarded to Auth service)
- POST /register
  - Body: { email, password, confirmPassword, firstName, lastName }
  - Description: Forwards to Auth Service register

- POST /login
  - Body: { email, password }
  - Description: Forwards to Auth Service login

- POST /validate
  - Body: { token }
  - Description: Forwards to Auth Service validate

- POST /message/validate
  - Body: { email }
  - Description: Forwards to Auth Service message/validate

- POST /reset
  - Body: { token, password }
  - Description: Forwards to Auth Service reset

- POST /message/reset
  - Body: { email }
  - Description: Forwards to Auth Service message/reset

### Users & Groups
- GET /users
  - Description: List all users (local DB)

- GET /me
  - Auth: Bearer token
  - Description: Get current user profile

- GET /groups
  - Description: List groups

- POST /group
  - Auth: Bearer token
  - Body: { name, ... }
  - Description: Create group

- POST /group/manual
  - Description: Create group manually (no auth in code)

- POST /group/add-member
  - Description: Add member to group

- POST /group/remove-member
  - Description: Remove member from group

### Tours
- POST /tour
  - Auth: Bearer token
  - Description: Create tour

- POST /tour/manual
  - Description: Create tour manually

- GET /tours
  - Auth: Bearer token
  - Description: List user tours

- GET /group/:groupId/tours
  - Auth: Bearer token
  - Description: List group tours

- GET /tour/:tourId
  - Auth: Bearer token
  - Description: Get tour by ID

- POST /tour/:tourId/start
  - Auth: Bearer token
  - Description: Start tour

- POST /tours/check-progress
  - Description: Check tours progress

- POST /tour/:tourId/advance
  - Auth: Bearer token
  - Description: Advance tour

- GET /tour/:tourId/current-round
  - Auth: Bearer token
  - Description: Get current round

### KYC (Identity verification)
- POST /kyc/submit
  - Auth: Bearer token
  - Multipart: idCard, selfie
  - Description: Submit KYC

- GET /kyc/status
  - Auth: Bearer token
  - Description: Get KYC status

- POST /kyc/check-unique
  - Description: Check id card uniqueness

- POST /kyc/:userId/approve
  - Description: Approve KYC

- POST /kyc/:userId/reject
  - Description: Reject KYC

### Stripe / Payments
- POST /stripe/create-account
- POST /stripe/create-customer
- POST /stripe/attach-payment
- POST /stripe/setup-payment
- POST /stripe/process-payments/:tourId
- GET  /stripe/payment-status/:tourId
- GET  /stripe/user-status
- POST /stripe/check-progress/:tourId
- GET  /stripe/balance
- GET  /stripe/balance/username/:username
- GET  /stripe/balance/id/:userId
- POST /stripe/payout

(Each stripe endpoint mostly requires authentication)

---

## How to use from React
- Use Auth service base `http://localhost:3001/api/v1/auth` for register/login and obtain JWT token.
- Send `Authorization: Bearer <token>` header to Darna and Tirelire protected endpoints.

Example login call from React:

```javascript
fetch('http://localhost:3001/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
.then(r => r.json())
.then(data => {
  if (data.success) {
    localStorage.setItem('token', data.data.token);
  }
});
```

## Notes & Next Steps
- Full Swagger docs are available for Darna (`/api/docs`) and Tirelire (`/api/docs`) when their services run.
- If you want, I can generate a consolidated OpenAPI spec (single file) that lists all endpoints across services.

---

_File generated automatically to help frontend integration._
