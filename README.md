# Inventory Management System (IMS)

## .env setup

Create an .env file and add the following before starting the server

**Development:**
``VITE_BACKEND_URL="http://localhost:3000"``

## Routes
### Item routes
| Action | Route                                   | HTTP Verb |
|--------|-----------------------------------------|-----------|
| Index  | `/items`                                | GET       |
| New    | `/items/new`                            | GET       |
| Create | `/items`                                | POST      |
| Show   | `/items/:itemsId`                       | GET       |
| Edit   | `/items/:itemsId/edit`                  | GET       |
| Update | `/items/:itemsId`                       | PUT       |
| Delete | `/items/:itemsId`                       | DELETE    |

### ActivityLog routes
| Action | Route                                   | HTTP Verb |
|--------|-----------------------------------------|-----------|
| Index  | `/logs`                                 | GET       |
