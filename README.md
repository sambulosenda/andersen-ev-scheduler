# EV Charging Scheduler

A React Native application for managing EV charging schedules with local authentication and SQLite database support.

## Features

### User Authentication
- Local authentication system with SQLite
- User registration and login
- Form validation with React Hook Form

### Scheduling Interface
- Create up to 10 charging schedules
- Select schedule type:
  - Time-based: Start time and end time
  - Charge level-based: Ready by time and desired charge level (0% - 100%)
  - Mileage-based: Ready by time and desired mileage (0mi - 250mi)
- Customize which days the schedule applies to

### Schedule Management
- View all created schedules
- Edit existing schedules
- Delete unwanted schedules
- Real-time updates with SQLite database

## Project Structure 

├── assets/# Images, fonts, and other static assets
├── components/ # Reusable UI components
├── constants/ # App constants (colors, dimensions, etc.)
├── database/ # Local SQLite database setup and operations
├── navigation/ # React Navigation setup
├── screens/ # Application screens
├── auth/ # Authentication screens
└── main/ # Main application screens
├── store/ # Zustand state management stores
├── styles/ # Shared styles
└── types/ # TypeScript type definitions


## Development Process
This application was developed using a feature-branching workflow. The main development was done on a schedules branch before merging back to the main branch once completed.

The development process focused on:
- Setting up the core project structure and libraries
- Implementing the database and state management
- Creating the authentication system
- Building the scheduling interface
- Styling the UI according to Andersen EV branding
- Implementing validation and error handling
- Setting up the CI/CD pipeline with GitHub Actions


## Time Spent
As requested in the assignment, the approximate time spent on this challenge was 4-5 hours, focusing on architecture, functionality, and UI design. I took a bit longer cause was having breaks in between. 

## Future Improvements
Given more time, the following enhancements could be made:
- Remote data synchronization with a backend service
- Push notifications for charging reminders
- More extensive testing suite
- Enhanced analytics for charging patterns
- Dark mode support
- Localization for multiple languages

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Andersen EV for providing the technical challenge
- The React Native and Expo communities for excellent documentation