# staff-scheduling-system

├── **SRC**
│ ├── **CONTROLLERS**
│ │ ├── adminController.ts
│ │ └── userController.ts
│ ├── **MODELS**
│ │ ├── index.ts
│ │ ├── rolesModel.ts
│ │ ├── scheduleModel.ts
│ │ └── userModel.ts
│ │
│ ├── **VIEWS**
│ │ ├── adminView.html
│ │ ├── userView.html
│ │ └── index.html
│
│ ├── **ROUTES**
│ │ ├── adminRoutes.ts
│ │ └── userRoutes.ts
│
│ └── **AUTHENTICATION**
│     ├── authenticate.ts
│     └── authorize.ts
├── **TESTS**
│ ├── adminController.test.ts
│ ├── userController.test.ts
│ └── scheduleModel.test.ts
├── package.json
├── tsconfig.json
└── index.ts



The staff scheduling application allows users to create an account and log in to the system. The application supports two user roles: Staff User and Admin. Staff Users can view their own schedule for any period of time up to one year, and they can see the schedules of their coworkers. Admins, on the other hand, have more powerful permissions. They can edit and delete all users, create, edit, and delete schedules for users, and order the users list by accumulated work hours per arbitrary period up to one year.

Schedules in the application contain the work date, the user assigned to the schedule, and the shift length in hours. The application provides relevant REST endpoints that can be accessed and interacted with via Postman or other similar software. It also includes relevant unit tests and a documentation page using Open API specifications. Finally, the application is dockerized and includes a README file describing how to run the project.
