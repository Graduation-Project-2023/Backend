## Endpoints

### login

- POST `api/login`
  - email
  - password

- POST `api/forgot_password`
  - email

- POST `/reset_password/:token`
  - password
  - confpassword

### Courses

- GET `/api/courses/?collegeId=1` - Get all courses for a college
- GET `/api/courses/1` - Get a course by id
- POST `/api/courses/` - Create a new course
  - englishName String
  - arabicName String,
  - code String
  - collegeId String?
  - arabicDescription String?,
  - englishDescription

### Programs

- GET `/api/programs/?collegeId=1` - Get all programs for a college
- GET `/api/programs/1` - Get a program by id
- POST `/api/programs/` - Create a new program
  - collegeId String
  - programCode String @unique
  - degree String
  - creditHours Int
  - mandatoryHours Int?
  - optionalHours Int?
  - projectQualifyingHours Int?
  - feesType FeesType
  - summerFeesType FeesType
  - allowedHrs AllowedHrs
  - prerequisiteProgramId String?
  - gradeLowering Int?
  - attemptsToLowerGrade Int?
  - failureGrade Int?
- PUT `/api/programs/1` - Update a program

### Levels

- GET `/api/programs/:program_id/levels/` - Get all levels for a program
- GET `/api/programs/:program_id/levels/1` - Get a level by id
- POST `/api/programs/:program_id//levels/` - Create a new level
  - englishName String
  - arabicName String
  - programId String?
  - level Int
  - qualifyingHrs Int
- PUT `/api/programs/:program_id/levels/1` - Update a level

### Grades

- GET `/api/programs/:program_id/grades/?program=1` - Get all grades for a program
- POST `/api/programs/:program_id/grades/` - Create a new grade
  - englishName String
  - arabicName String
  - programId String?
  - level Int
  - qualifyingHrs Int
- PUT `/api/programs/:program_id/grades/1` - Update a grade

### Program Courses

- GET `/api/programs/:program_id/program-courses/?program=1` - Get all program courses for a program
- GET `/api/programs/:program_id/program-courses/1` - Get a program course by id
  - programId String
  - course Course
    - code String
    - englishName String
    - arabicName String
  - prerequisiteId String?
  - semester Semester
  - creditHours Int
  - minimumHrsToRegister Int?
  - courseType CourseType
  - classWork Int?
  - finalExam Int?
  - midTerm Int?
  - oralPractical Int?
  - attendance Int?
- POST `/api/programs/:program_id/program-courses/` - Create a new program course
  - programId String
  - courseId String
  - levelId String?
  - prerequisiteId String?
  - semester Semester
  - creditHours Int
  - minimumHrsToRegister Int?
  - courseType CourseType
  - classWork Int?
  - finalExam Int?
  - midTerm Int?
  - oralPractical Int?
  - attendance Int?
- PUT `/api/programs/:program_id/program-courses/1` - Update a program course

### Level Allowed Hours (العبء بالمستوى)

- GET `/api/level-allowed-hours/?program=1` - Get all level allowed hours for a program
- POST `/api/programs/:program_id/level-allowed-hours/` - Create a new level allowed hour
  - programId String?
  - semester Semester
  - level Int
  - levelId String
  - minHours Int
  - maxHours Int
  - maxCourses Int
- PUT `/api/programs/:program_id/level-allowed-hours/1` - Update a level allowed hour

### Gpa Allowed Hours (العبء بالمعدل)

- GET `/api/programs/:program_id/gpa-allowed-hours/?program=1` - Get all gpa allowed hours for a program
- POST `/api/programs/:program_id/gpa-allowed-hours/` - Create a new gpa allowed hour
  - programId String?
  - fromGpa Float
  - toGpa Float
  - minHours Int
  - maxHours Int
  - maxCourses Int

### CSV Upload
- POST `api/csv_upload` - Create multiple users 
- `order doesn't matter but the csv headers must be identical to the below headers (case_sensitive), only nationalid is mandatory`
  - multipart form data
  - the field name of csv is expected to be `csv`


### Create user

- POST `api/create_user` - Create one user
  - `order doesn't matter but the csv headers must be identical to the below headers, only nationalid is mandatory`
  - englishName
  - arabicName
  - gender
  - religion
  - nationality
  - birthDate
  - nationalId
  - enrollmentYear
  - address
  - homePhone
  - birthPlace
  - guardianName
  - contactPhone
  - PreviousQualification
  - TotalPreviousQualification
  - InstitutePreviousQualification
  - schoolMarks
  - schoolSeatId
  - collegeCode
  - directorate

## Data relations
=======
# Commands

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run test` - Run the test suite
- `npm run migrate` - Run migrations
- `npm run lint:f` - Run linter and fix errors
