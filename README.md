# Inventory Management App - Angular

A modern, responsive inventory management application built with Angular and Angular Material.

## Requirements Implementation

### Core Features 
1. Display inventory items
   - Implemented list view with columns for name, category, stock, and last updated date
   - Used Angular Material's MatTable for efficient data display
   - Added sorting and pagination capabilities

2. Item Management 
   - View and edit functionality for selected items
   - Form validation ensures data integrity
   - Real-time updates using RxJS streams

3. Add New Items 
   - Comprehensive form with validation
   - Name field required
   - Stock quantity must be non-negative
   - Category selection with predefined options

4. Search and Filter 
   - Search by item name with debounce
   - Filter by stock status (Low Stock < 5, In Stock ≥ 5)
   - Reactive filtering using RxJS operators

5. Backend Simulation 
   - REST API simulation using services
   - CRUD operations implemented
   - Asynchronous data handling with Observables

### Architecture Requirements 

1. Component-Based Design
   - Followed Angular best practices
   - Clear separation of concerns
   - Reusable components

2. Business Logic & State Management
   - Services handle business logic
   - BehaviorSubject for state management
   - Observable streams for data flow

3. Modular Structure
   - Feature modules (Inventory)
   - Core module for services
   - Shared module for common components
   - Lazy loading implemented

4. Responsive Design
   - Angular Material components
   - Mobile-first approach
   - Flexible layouts

5. Unit Testing
   - Service tests for CRUD operations
   - Component tests for validation
   - Form validation tests

## Architectural Decisions

### 1. State Management
- Chose RxJS BehaviorSubject over NgRx/Redux for state management
  - Reasoning: For this scale of application, BehaviorSubject provides sufficient state management without the overhead of a full state management library
  - Benefits: Simpler implementation, smaller bundle size, easier learning curve
  - Implementation: Used in InventoryService to manage inventory items state

### 2. Module Structure
- Core Module
  - Contains singleton services and app-wide providers
  - Guards against multiple instantiation
- Feature Modules (Inventory)
  - Encapsulates related components and services
  - Enables lazy loading for better initial load performance
- Shared Module
  - Houses reusable components, directives, and pipes
  - Improves code reusability and maintainability

### 3. Component Architecture
- Smart/Container Components
  - Inventory List Component: Manages data and state
  - Add Inventory Component: Handles form submission logic
- Presentational Components
  - Inventory Form Component: Pure form display and validation
  - Item Card Component: Displays individual items

### 4. Form Implementation
- Reactive Forms
  - Better type safety and validation
  - More flexible form controls
  - Easier unit testing
- Custom Validators
  - Stock quantity validation (non-negative)
  - Required field validation

## Technology Choices

### 1. Angular Material
- Reasoning:
  - Production-ready UI components
  - Built-in accessibility
  - Consistent Material Design
  - Extensive documentation
- Components Used:
  - MatTable for inventory list
  - MatForm for input fields
  - MatDialog for modals
  - MatCard for item cards

### 2. TypeScript
- Strong typing for better development experience
- Interface definitions for inventory items
- Decorators for Angular features
- Enhanced IDE support

### 3. RxJS
- Used for:
  - State management (BehaviorSubject)
  - Search debouncing
  - Combining multiple data streams
  - Async data handling

### 4. SCSS
- Component-scoped styles
- Variables for consistent theming
- Mixins for responsive design
- Nested selectors for better organization

## Testing Strategy

### Unit Tests
- Services: Testing CRUD operations
- Components: Testing business logic
- Forms: Testing validation
- Coverage target: >80%

### Integration Tests
- Component interaction testing
- Service integration testing
- Router navigation testing

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/michelsami/Inventory-management-app-Angular.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
ng serve
```

4. Navigate to `http://localhost:4200/`

## Future Improvements

1. Performance Optimizations
   - Virtual scrolling for large lists
   - Image optimization
   - Progressive web app features

2. Feature Enhancements
   - Batch operations
   - Export/Import functionality
   - Advanced filtering
   - Real-time updates

3. Testing
   - E2E tests with Cypress
   - Performance testing
   - Visual regression testing