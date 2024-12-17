# JavaScript - REST API - SQL 
This repository contains my solutions to the LinearSix Software Engineer screening test. The assignment consists of three main tasks demonstrating JavaScript programming, REST API integration, and SQL query development skills.

## Repository Structure
<pre>
linear-six-screening-test/
├── javascript/
│   ├── task1.1-date-extension.js      # Date object extension
│   ├── task1.2-sales-sort.js          # Sales data sorting
│   └── task1.3-object-projection.js   # Object projection implementation
├── rest-api/
│   ├── calendar-api.js                # Google Calendar busy intervals implementation
├── sql/
│   ├── create-tables.sql              # SQL table creation
│   └── queries.sql                    # Required SQL queries
└── README.md
</pre>

## Task Solutions

### 1. JavaScript Tasks

#### 1.1 Date Extension
- Extended JavaScript's Date object with `daysTo()` method
- Calculates complete days between two dates
- Handles timezone issues using UTC
- Includes comprehensive test cases

#### 1.2 Sales Sort
- Processes array of sales objects
- Calculates total value (amount * quantity)
- Returns sorted array without modifying input
- Includes validation and error handling

#### 1.3 Object Projection
- Creates projected object based on source and prototype objects
- Maintains structure intersection
- Preserves source object values
- Handles nested objects

### 2. REST API Integration (Google Calendar Busy Intervals Implementation)

- Implementation of Google Calendar Free/Busy API
- Features:
  - OAuth2 authentication
  - Get busy time intervals
  - Input validation
  - Error handling
  - Comprehensive testing

#### Setup
1. Enable Google Calendar API in Google Cloud Console
2. Configure OAuth consent screen
3. Set up credentials (API key and OAuth client ID)
4. Add test users if using external user type

#### Required Environment Variables
- `API_KEY`: Calendar API key
- `CLIENT_ID`: Client identification

### 3. SQL Development

- Table creation and data insertion scripts
- Queries for:
  - Empty test groups
  - Users named Victor not in test groups
  - Users created before their group membership

#### Setup and Testing
  - [https://www.programiz.com/sql/online-compiler/]
