### Backend Framework: Express.js
 Chosen for its simplicity and efficiency in handling HTTP requests.
 Provides middleware support (express.json(), cors()) for structured API handling.

### Key API Endpoints
1. Get Commit Details
Endpoint:
GET /repositories/:owner/:repository/commits/:oid

GitHub API Used:
GET /repos/{owner}/{repository}/commits/{sha}

2. Get Commit Diff
Endpoint:
GET /repositories/:owner/:repository/commits/:oid/diff

GitHub API Used:
GET /repos/{owner}/{repository}/compare/{base}...{head}

### Known Limitations & Trade-offs
1. **GitHub API Rate Limits**
Since the API fetches live data, excessive requests may hit GitHub’s rate limit.
Possible Fix: Implement caching to reduce API calls.

### Frontend Framework: React.js
Encourages modular and reusable UI components.

### Libraries used
**@radix-ui/react-accordion** - Provides an accessible, animated accordion component.
**react-icons** - A library for adding vector icons.
**react-spinners** - A lightweight library for adding loading indicators.
**axios** - A promise-based HTTP client for making API requests.
