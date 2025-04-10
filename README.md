# NYT Most Popular Articles Viewer

A modern React app to explore the **New York Times Most Popular Articles**, built with a clean master-detail layout, Zustand state management, and Tailwind styling.

## Tech Stack

- **React** – Component-based UI rendering  
- **React Router DOM** – Navigation (master/detail pattern)  
- **Tailwind CSS** – Utility-first styling  
- **Zustand** – Global state management with data persistence  
- **Shadcn** – Modern UI components   
- **Jest** – Unit/UI testing  
- **NYT Most Popular API** – Article data source

## Architecture & Code Structure

- **Pages**
  - `Home` – Master list of articles
  - `NewsDetail` – Detail view via query parameter

- **Custom Hooks**
  - `useQuery` – Parses URL query parameters
  - `useNews` – Fetches articles from NYT API

- **Store**
  - `articleStore` (Zustand) – Holds selected article state
  - LocalStorage fallback for refresh recovery

- **Routing**
  - Query param-based navigation (`?uri=...`)


## Engineering Practices

### SOLID Principles

- **S – Single Responsibility**  
  Each component/hook/store handles one concern.

- **O – Open/Closed**  
  Components like `NewsDetail` are extensible (e.g., share buttons, tags).

- **L – Liskov Substitution**  
  Reusable components maintain consistent props and behavior.

- **I – Interface Segregation**  
  UI, logic, and state are separated across files.

- **D – Dependency Inversion**  
  Components depend on abstracted sources (e.g., `useQuery`, `articleStore`).

### Clean Code Principles

- **DRY** – Common logic (e.g., query parsing, styles) is reused
- **Separation of Concerns**
  - **State:** Zustand
  - **Routing:** React Router
  - **Styling:** Tailwind
  - **Data Parsing:** Custom hooks
  - **Fallback Logic:** Separate JSON parsing logic

- **Safe Coding**
  - Optional chaining (`?.`)
  - URI decoding (`decodeURIComponent`)
  - Fallback rendering for missing articles

- **Readable JSX**
  - Proper indentation
  - Descriptive class names
  - Inline styles encapsulated in variables


## Testing Strategy

- **Tool:** Jest  
- **Mocked:** Zustand store and query logic  
- **Tested:**
  - Happy Path (valid URI and selected article)
  - Fallback Path (no state → "Article not found")  
- **Assertions:**
  - Title
  - Image
  - Keywords
  - Source


## Performance & UX

- Mobile-first responsive design via Tailwind
- Smooth image transitions
- Refresh-safe navigation via `localStorage`
- Keyword badges as interactive pills (future enhancements)


## Getting Started

```bash
# Clone the repository
git clone git@github.com:ghassanmalik/newyork-times-app.git
cd newyork-times-app

# Install dependencies
npm install

# Start the development server
npm start

# Run tests
npm test

# Run lint checks and auto-fix issues
npm run lint

# Run tests with coverage report
npm run coverage
