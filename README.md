#  Live Bidding Platform

##  Project Structure

```
Levich/
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── src/
│   │   ├── app.js            # Express app setup
│   │   ├── server.js         # HTTP + Socket server bootstrap
│   │   ├── common/
│   │   │   ├── logger.js
│   │   │   └── mutex.js
│   │   ├── config/
│   │   │   ├── env.js
│   │   │   └── index.js
│   │   ├── http/
│   │   │   ├── controllers/
│   │   │   │   ├── items.controller.js
│   │   │   │   ├── time.controller.js
│   │   │   │   └── users.controller.js
│   │   │   └── routes/
│   │   │       ├── items.routes.js
│   │   │       ├── time.routes.js
│   │   │       └── users.routes.js
│   │   ├── modules/
│   │   ├── seed/
│   │   │   └── seedItems.js
│   │   └── socket/
│   │       ├── bid.gateway.js
│   │       └── index.js
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── main.js
│
└── README.md
```

---



##  Concurrency Handling (Race Condition Protection)

**Challenge:** If two users place the same bid amount at the exact same millisecond, only the first bid should be accepted. The second user must immediately receive an **Outbid** error.

###  How This Is Handled

Concurrency control is implemented at the **Socket layer** using a mutex lock.

**Relevant Files:**

```
src/common/mutex.js
src/socket/bid.gateway.js
```

###  mutex.js

Provides a simple mutual-exclusion lock to ensure only one bid is processed at a time per critical section.

Purpose:

* Prevents simultaneous updates to the same auction item
* Guarantees atomic read → validate → update sequence

###  bid.gateway.js

Inside the `placeBid` socket handler:

Flow:

1. Acquire mutex lock
2. Fetch current item state
3. Check auction not expired
4. Check bid > currentBid
5. If valid → update currentBid
6. Else → emit `outbid` error
7. Release mutex lock

Because this entire block executes under a lock, two bids cannot update the same item concurrently.

###  Result

Even if two users send `$100` at the same millisecond:

* First request acquires lock → succeeds
* Second request waits → sees updated price → rejected

This guarantees deterministic ordering and eliminates race conditions.

--- 

##  Backend Architecture (High Level)

```
Routes -> Controllers -> Business Logic -> Socket Gateway
```

* Routes handle HTTP endpoints
* Controllers validate requests
* Socket Gateway manages real-time events
* Seed module initializes sample auction items

---

##  REST API Endpoints

### Get All Items

```
GET /api/items
```

Response:

```json
[
  {
    "id": 1,
    "title": "MacBook Pro",
    "startingPrice": 80000,
    "currentBid": 85000,
    "endTime": 1700000000000
  }
]
```

---

### Get Server Time

```
GET /api/time
```

---

### Create User Session

```
POST /api/users/session
```

---

##  Socket.IO Events

### Client → Server

| Event    | Payload            | Description |
| -------- | ------------------ | ----------- |
| placeBid | { itemId, amount } | Place a bid |

### Server → Client

| Event        | Payload      | Description      |
| ------------ | ------------ | ---------------- |
| bidUpdate    | Updated item | New highest bid  |
| auctionEnded | itemId       | Auction finished |

---

##  Bidding Flow

1. Client loads items via REST
2. User enters bid
3. Client emits `placeBid`
4. Server validates
5. Updates in-memory store
6. Broadcasts `bidUpdate`

---

##  Auction Expiration Logic

* Each item contains `endTime`
* If current time > endTime → reject bid
* Server emits `auctionEnded`

---

##  Validation Rules

* Bid must be higher than currentBid
* Auction must be active
* Item must exist

---


##  Docker Support (Backend)

```
docker build -t levich-backend .
docker run -p 4000:4000 levich-backend
```

---

##  Error Handling

* Invalid payload → ignored
* Lower bid → rejected
* Expired auction → rejected

---

## Scalability Considerations

* Replace in-memory store with Redis or DB
* Horizontal scaling with Socket.IO adapter
* Authentication using JWT

---


##  Author

Sakil

---
