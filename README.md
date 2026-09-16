# 🌍 TravelSync - Mobile Travel Management & Group Coordination

A modern, production-style mobile-first travel management and group coordination web application built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**.

![TravelSync](https://img.shields.io/badge/TravelSync-v1.0-emerald) ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan)

---

## 📱 Features

### 🔐 Authentication
- Login with email/username and password
- Registration with validation (email, password strength, duplicate prevention)
- JWT-style session management
- Secure password handling

### 🏠 Dashboard
- Welcome screen with quick statistics
- 8 quick action buttons (Create Trip, Join Group, Open Map, Send Alert, etc.)
- My Groups list with group codes
- Upcoming trips overview
- Recent alerts and notifications

### 👥 Group System
- Create travel groups with destinations, dates, and descriptions
- Unique group code generation (e.g., `KER-7X92AB`)
- Join groups via group code
- Role-based permissions (Admin/Member)
- Admin controls: remove members, regenerate codes, manage settings
- Group codes are non-guessable and don't expose private info

### 💬 Group Chat
- WhatsApp/Telegram-style chat interface
- Message types: Text, Image, Video, Audio, Location, Alert, Threat
- Message timestamps and sender identification
- Quick action bar for alerts, threats, locations, and photos
- Real-time message updates

### 🗺️ Live Map
- Interactive map with animated member markers
- Alert and threat markers with severity colors
- Destination markers
- Filter by: All, Members, Alerts, Threats
- Location sharing toggle (privacy-conscious)
- Member info popups with last-updated timestamps

### 🚨 Travel Alerts
- 12 alert types: Emergency, Accident, Road Block, Bad Weather, Dangerous Area, Vehicle Problem, Medical Assistance, Security Issue, Lost Person, Fire, Flood, Other
- Severity levels: Low, Medium, High, Critical
- Real-time display in chat and dedicated alerts tab
- Map marker integration

### ⚠️ Threat Reporting
- 12 threat types: Theft, Unsafe Road, Accident, Flood, Landslide, Wild Animal, Fire, Crime, Harassment, Unsafe Area, Weather Hazard, Other
- 4 severity levels with color-coded markers
- User-generated warnings (clearly labeled as unverified)
- Map integration with severity-based colors

### 🆘 SOS Emergency
- Prominent SOS button in group chat
- Confirmation dialog before sending
- Notifies all group members with location
- Creates emergency alert automatically

### 🧭 Trip Management
- Trip overviews with destinations and places to visit
- Travel timeline (day-by-day journal)
- Shared media gallery
- Member lists with group integration

### 🔔 Notifications
- Push-style notifications for: messages, alerts, threats, location shares, member joins
- Unread count badge
- Notification center with read/unread states

### 🔍 Global Search
- Search across messages, members, trips, alerts, and media
- Filter tabs for each category
- Real-time search results

### 📊 Travel Statistics
- Total trips, places visited, groups joined
- Messages sent, photos/videos shared
- Activity chart (monthly trip data)
- Distance traveled
- Top destinations with progress bars

### 👤 User Profile
- Profile information (name, email, phone, travel history)
- Location sharing toggle
- Privacy settings
- Notification management
- Password change option
- Sign out

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 6 |
| Icons | Lucide React |
| State Management | React Context API |
| Animations | CSS Animations + Framer Motion |

---

## 📁 Project Structure

```
src/
├── App.tsx                    # Main app with routing
├── main.tsx                   # Entry point
├── index.css                  # Global styles
├── types/
│   └── index.ts               # TypeScript interfaces
├── data/
│   └── mockData.ts            # Demo data (users, groups, messages, etc.)
├── context/
│   └── AppContext.tsx          # Global state management
├── components/
│   └── Layout.tsx             # Shared layout with bottom navigation
└── pages/
    ├── LoginPage.tsx          # Authentication login
    ├── RegisterPage.tsx       # User registration
    ├── Dashboard.tsx          # Main dashboard
    ├── GroupsPage.tsx         # Groups list
    ├── GroupDetail.tsx        # Group chat, map, media, alerts, members
    ├── CreateGroup.tsx        # Group creation with code generation
    ├── JoinGroup.tsx          # Join via group code
    ├── TripsPage.tsx          # Trips list
    ├── TripDetail.tsx         # Trip overview with timeline
    ├── MapPage.tsx            # Live group map
    ├── ProfilePage.tsx        # User profile & settings
    ├── NotificationsPage.tsx  # Notification center
    ├── SearchPage.tsx         # Global search
    └── StatsPage.tsx          # Travel statistics
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/travel.git
cd travel

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Demo Login
Use any of these demo accounts (any password works):
- `harish@travelsync.com` (Admin - Harish Kumar)
- `arun@travelsync.com` (Arun Sharma)
- `karthik@travelsync.com` (Karthik Raj)
- `rahul@travelsync.com` (Rahul Verma)
- `priya@travelsync.com` (Priya Nair)

### Demo Group Code
Join the "Kerala Adventure 2026" group with code: **`KER-7X92AB`**

---

## 📱 Application Flow

```
New User
  ↓
Register → Login → Dashboard
  ↓
Create Group → System generates Group Code
  ↓
Share code with friends
  ↓
Friends login/register → Enter Group Code → Join Group
  ↓
Group Dashboard → Chat + Media + Location + Alerts + Threat Reports
```

---

## 🗄️ Database Schema (Reference)

The application is designed to work with the following database entities:

| Table | Description |
|-------|-------------|
| `users` | User accounts with profile info |
| `groups` | Travel groups with codes |
| `group_members` | Group membership mappings |
| `trips` | Trip details and itineraries |
| `messages` | Chat messages (text, media, location) |
| `media` | Shared photos, videos, audio |
| `locations` | Live location tracking |
| `alerts` | Travel alerts |
| `threat_reports` | User-reported threats |
| `notifications` | Push notifications |
| `travel_timeline` | Day-by-day travel journal |

---

## 🔒 Security Features

- JWT-style authentication
- Password validation (8+ chars, uppercase, number)
- Role-based authorization (Admin/Member)
- Group-level access control
- Location privacy controls
- Non-guessable group codes
- Input validation on all forms
- User-generated warnings clearly labeled

---

## 📋 REST API Reference (Backend Design)

```
Authentication:
  POST /api/auth/register
  POST /api/auth/login
  POST /api/auth/refresh

Groups:
  POST /api/groups
  POST /api/groups/join
  GET  /api/groups
  GET  /api/groups/{id}
  DELETE /api/groups/{id}/members/{userId}

Messages:
  GET  /api/groups/{id}/messages
  POST /api/messages

Locations:
  POST /api/groups/{id}/locations
  GET  /api/groups/{id}/locations

Alerts:
  POST /api/groups/{id}/alerts
  GET  /api/groups/{id}/alerts

Threats:
  POST /api/groups/{id}/threats
  GET  /api/groups/{id}/threats

Trips:
  POST /api/trips
  GET  /api/trips
  GET  /api/trips/{id}
```

---

## 🌐 WebSocket Events

```
MESSAGE_SENT       - New message in group
MESSAGE_RECEIVED   - Message delivered to member
LOCATION_UPDATED   - Member location changed
ALERT_CREATED      - New travel alert
THREAT_REPORTED    - New threat report
MEMBER_JOINED      - User joined group
MEMBER_LEFT        - User left group
```

---

## 📄 License

This project is built as a demonstration of modern web application development.

---

## 👨‍💻 Author

Built with ❤️ for travelers who want to stay connected on the road.
