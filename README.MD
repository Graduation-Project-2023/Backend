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
