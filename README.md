# Inventory Management System (IMS)

## .env setup

Create an .env file and add the following before starting the server

**Development:**
``VITE_BACKEND_URL="http://localhost:3000"``

## User Stories
- As a User, I want to sign up or sign in before viewing and managing the inventory to ensure that any changes in the inventory can be tracked.
- As a User, I want to create, read, update, and delete inventory items, so that I can efficiently manage school resources like textbooks, lab equipment, and supplies.
- As a User, I want to ensure that only authorized users can modify inventory data, so that unauthorized changes are prevented and data integrity is maintained.
- As a User, I want all secret keys to be handled securely in the back end, so that sensitive information is not exposed and the application remains secure.
- As a User, I want to access the inventory system online from anywhere, so that inventory management can be convenient and I can reduce paperwork.
- As a User, I want an activity log that records all actions, so that I can have complete accountability for changes and efficiently manage resources.
- As a User, I want to manage the availability of classroom materials, so that I do not run out of critical supplies like textbooks and whiteboard markers.
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
