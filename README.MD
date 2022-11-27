## Endpoints

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

- GET `/api/levels/?program=1` - Get all levels for a program
- GET `/api/levels/1` - Get a level by id
- POST `/api/levels/` - Create a new level
  - englishName String
  - arabicName String
  - programId String?
  - level Int
  - qualifyingHrs Int
- PUT `/api/levels/1` - Update a level

### Grades

- GET `/api/grades/?program=1` - Get all grades for a program
- POST `/api/grades/` - Create a new grade
  - englishName String
  - arabicName String
  - programId String?
  - level Int
  - qualifyingHrs Int
- PUT `/api/grades/1` - Update a grade

### Program Courses

- GET `/api/program-courses/?program=1` - Get all program courses for a program
- GET `/api/program-courses/1` - Get a program course by id
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
- POST `/api/program-courses/` - Create a new program course
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
- PUT `/api/program-courses/1` - Update a program course

### Level Allowed Hours (العبء بالمستوى)

- GET `/api/level-allowed-hours/?program=1` - Get all level allowed hours for a program
- POST `/api/level-allowed-hours/` - Create a new level allowed hour
  - programId String?
  - semester Semester
  - level Int
  - levelId String
  - minHours Int
  - maxHours Int
  - maxCourses Int
- PUT `/api/level-allowed-hours/1` - Update a level allowed hour

### Gpa Allowed Hours (العبء بالمعدل)

- GET `/api/gpa-allowed-hours/?program=1` - Get all gpa allowed hours for a program
- POST `/api/gpa-allowed-hours/` - Create a new gpa allowed hour
  - programId String?
  - fromGpa Float
  - toGpa Float
  - minHours Int
  - maxHours Int
  - maxCourses Int

## Data relations

### User

- Student: 0..1
- Professor: 0..1

### Department

- courses: 0..\*
- professors: 0..\*
- students: 0..\*

### Branch

- courses: 0..\*
- professors: 0..\*
- students: 0..\*

### Course

- department: 0..1
- branch: 0..1
- course: 0..\*

### CourseGrade

- course: 1
- student: 1

### Class

- course: 1
- professor: 1
- students: 0..\*

### StudentClass

- class: 1
- student: 1

### Student

- user: 1
- branch: 0..1
- department: 0..1
