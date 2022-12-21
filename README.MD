# API Endpoints

## Login Routes

### login route `/api/login`

#### Request `POST`
```
{
  "email": "mohamed.raafat@eng.suez.edu.eg",
  "password": "123456"
}
```

#### Responses
```
200 ok for successful login
401 Incorrect email or password         for invalid credentials
401 Missing credentials                 for missing email or password
```

### Forgot password route `api/forgot_password`

#### Request `POST`
```
{
  "email": "mohamed.raafat@eng.suez.edu.eg"
}
```
#### Responses
```
200 Reset link sent     if the user exist in the database
400 user not found      if the user doesn't exist
```

### Reset password route `api/reset_password/:token`

#### Request `POST`
```
{
  "password": "123456",
  "confpassword": "123456"
}
```

#### Responses
```
401 token is requred       if the token is not provided in the url
401 password and confirm password must match
498 Invalid token           if the token is altered
200 Password updated        if all is good
```
 ___________________________________________

 ## College

### Get all colleges `/api/colleges`

#### Request `GET`
```
/api/colleges
```

#### Response
```
[
  {
    "id": "81521f18-76e6-41fb-81a6-34e8076cd684",
    "englishName": "Faculty of Engineering",
    "arabicName": "كلية الهندسة"
  },
  {
    "id": "b85ba1f6-38fe-4017-be83-26b75ec71e4a",
    "englishName": "Faculty of Pharmacy",
    "arabicName": "كلية الصيدلة"
  },
  {
    "id": "5e4f9d29-f938-4f06-a5ed-020f2944b9bb",
    "englishName": "Faculty of Arts",
    "arabicName": "كلية الفنون"
  }, ....
]

** 200 OK is the only reponse you can get whether the id is correct or not
```

### Get specefic college `/api/colleges/:id`

#### Request `GET`
```
/api/colleges/81521f18-76e6-41fb-81a6-34e8076cd684
```

#### Response
```
{
  "id": "81521f18-76e6-41fb-81a6-34e8076cd684",
  "englishName": "Faculty of Engineering",
  "arabicName": "كلية الهندسة"
}

** 200 OK is the only reponse you can get whether the id is correct or not
```

### Create College `/api/college`

#### Request `POST`
```
{
  "englishName": "Faculty of raafatxx",
  "arabicName": "كلية الصيدلة"
}
** both english and arabic name are mandatory
```

#### Response
```
201 along with the created object       if the request is ok
400 missing english or arabic name      if there are any missing fields
```

### Update college `/api/college/:id`

#### Request `PUT`
```
{
  "englishName": "Faculty of Engineeringxx"
}
** update englishname or arabicname or both
```

#### Response
```

200 ok along with the updated object        if all is good
422 Invalid Arguments                       if request is empty or wrong keys
```

### Delete college `/api/college/:id`

#### Request `DELETE`
```
/api/colleges/9763179f-bc95-47dd-913f-262a4da3e396
```

#### Response
```
200 OK along with the deleted object            if id  exists
404 college not found                           if id doesn't exist
```

________________________________

 ## Create users

 ### Upload CSV route `/api/students/bulk?collegeId=xxxx`

 #### Request `query param` `POST`
```
the input name must be "csv" **case sensetive
don't forget the collegeId as a query parameter
the only constraint is the nationalId
uncreated students are returned in an array
```

#### Response
```
201 on sucess with an array of failed students
400 on failure
```

### Create user route `/api/student`

 #### Request `POST`
```
{
  "email": "raaafat@eng.suez.edu.eg",
  "englishName": "Salem El Hamood",               
  "arabicName": "سالم الحمود",
  "address": "Hamood El Hamood street, Riyadh, Saudi Arabia",
  "birthDate": "1999-01-01",
  "birthPlace": "Riyadh",                 
  "contactPhone": "+964 770 123 4567",
  "gender": "MALE",
  "guardianName": "Hamood El Hamood",
  "homePhone": "0643217123",
  "nationalId": "30006161588373",
  "nationality": "Saudi",
  "religion": "MUSLIM",
  "collegeId": "032a81cd-ac05-438b-841e-037e92cc5fe5",
  "InstitutePreviousQualification": "IDK",
  "PreviousQualification": "IDK",
  "TotalPreviousQualification": "IDK",
  "collegeCode": "32",    
  "directorate": "Ismailia",                
  "enrollmentYear": "2023",
  "schoolMarks": "294.5",     
  "schoolSeatId": "743751"                  
}
** nationalId is the only mandatory field, the rest are optional
```

#### Response
```
201 ok
{
  "id": "4a45e167-afa0-41f1-aad4-40ffea093b72",
  "userId": "e6970756-98a7-4b73-bd8e-66917fa5654a",
  "arabicName": "سالم الحمود",
  "englishName": "Salem El Hamood",
  "SeatId": 102,
  "gender": "MALE",
  "religion": "MUSLIM",
  "birthDate": "1999-01-01T00:00:00.000Z",
  "birthPlace": "Riyadh",
  "nationalId": "30006161288373",
  "nationality": "Saudi",
  "maritalStatus": null,
  "otherNationality": null,
  "address": "Hamood El Hamood street, Riyadh, Saudi Arabia",
  "contactPhone": "+964 770 123 4567",
  "homePhone": "0643217123",
  "guardianName": "Hamood El Hamood",
  "guardianAddress": null,
  "guardianNationality": null,
  "guardianPhone": null,
  "InstitutePreviousQualification": "IDK",
  "PreviousQualification": "IDK",
  "TotalPreviousQualification": "IDK",
  "schoolMarks": "294.5",
  "schoolSeatId": "743751",
  "recruitmentState": null,
  "armyNumber": null,
  "recruitmentNumber": null,
  "recruitmentDate": "1970-01-01T00:00:00.000Z",
  "enrollmentYear": "2023-01-01T00:00:00.000Z",
  "enrollmentYearEndDate": "1970-01-01T00:00:00.000Z",
  "reserveEndDate": "1970-01-01T00:00:00.000Z",
  "collegeId": "032a81cd-ac05-438b-841e-037e92cc5fe5",
  "programId": null,
  "directorate": "Ismailia",
  "collegeCode": "32",
  "enrollmentSemesterId": null
}
```

### Get user route `/api/student/:id`

 #### Request `GET`
```
GET http://localhost:8080/api/student/031e323d-d4d0-414e-9551-be688970738c
```

### Get all users route `/api/student/all/:collegeId`

#### Request `GET`

```
GET http://localhost:8080/api/student/all/0ca30298-090c-45f2-b765-cc9b11a67c1d
```

### Update user route `/api/student/:id`

#### Request `PUT`

```
{
  "englishName": "Hamooooooooooooooooooooooooooooooooooooooood"
}
```

#### Response
```
{
  "id": "4e8ca890-f40e-4bb2-b8d7-c9c6759083cb",
  "userId": "5fe3dccf-f664-4284-b6e1-f37de954c7ab",
  "arabicName": "سالم الحمود",
  "englishName": "Hamooooooooooooooooooooooooooooooooooooooood",
  "SeatId": 101,
  "gender": "MALE",
  "religion": "MUSLIM",
  "birthDate": "1999-01-01T00:00:00.000Z",
  "birthPlace": "Riyadh",
  "nationalId": "30006161588373",
  "nationality": "Saudi",
  "maritalStatus": null,
  "otherNationality": null,
  "address": "Hamood El Hamood street, Riyadh, Saudi Arabia",
  "contactPhone": "+964 770 123 4567",
  "homePhone": "0643217123",
  "guardianName": "Hamood El Hamood",
  "guardianAddress": null,
  "guardianNationality": null,
  "guardianPhone": null,
  "InstitutePreviousQualification": "IDK",
  "PreviousQualification": "IDK",
  "TotalPreviousQualification": "IDK",
  "schoolMarks": "294.5",
  "schoolSeatId": "743751",
  "recruitmentState": null,
  "armyNumber": null,
  "recruitmentNumber": null,
  "recruitmentDate": "1970-01-01T00:00:00.000Z",
  "enrollmentYear": "2023-01-01T00:00:00.000Z",
  "enrollmentYearEndDate": "1970-01-01T00:00:00.000Z",
  "reserveEndDate": "1970-01-01T00:00:00.000Z",
  "collegeId": "032a81cd-ac05-438b-841e-037e92cc5fe5",
  "programId": null,
  "directorate": "Ismailia",
  "collegeCode": "32",
  "enrollmentSemesterId": null
}
```

### Delete user route `/api/student/:id`

#### Request `DELETE`

```
DELETE http://localhost:8080/api/student/6521e1d0-1721-4442-a4f8-3082e87e9e24
```

#### Response
```

{
  "id": "4e8ca890-f40e-4bb2-b8d7-c9c6759083cb",
  "userId": "5fe3dccf-f664-4284-b6e1-f37de954c7ab",
  "arabicName": "سالم الحمود",
  "englishName": "Hamooooooooooooooooooooooooooooooooooooooood",
  "SeatId": 101,
  "gender": "MALE",
  "religion": "MUSLIM",
  "birthDate": "1999-01-01T00:00:00.000Z",
  "birthPlace": "Riyadh",
  "nationalId": "30006161588373",
  "nationality": "Saudi",
  "maritalStatus": null,
  "otherNationality": null,
  "address": "Hamood El Hamood street, Riyadh, Saudi Arabia",
  "contactPhone": "+964 770 123 4567",
  "homePhone": "0643217123",
  "guardianName": "Hamood El Hamood",
  "guardianAddress": null,
  "guardianNationality": null,
  "guardianPhone": null,
  "InstitutePreviousQualification": "IDK",
  "PreviousQualification": "IDK",
  "TotalPreviousQualification": "IDK",
  "schoolMarks": "294.5",
  "schoolSeatId": "743751",
  "recruitmentState": null,
  "armyNumber": null,
  "recruitmentNumber": null,
  "recruitmentDate": "1970-01-01T00:00:00.000Z",
  "enrollmentYear": "2023-01-01T00:00:00.000Z",
  "enrollmentYearEndDate": "1970-01-01T00:00:00.000Z",
  "reserveEndDate": "1970-01-01T00:00:00.000Z",
  "collegeId": "032a81cd-ac05-438b-841e-037e92cc5fe5",
  "programId": null,
  "directorate": "Ismailia",
  "collegeCode": "32",
  "enrollmentSemesterId": null
}
```

_______________________________


## programs

### Get all programs `/api/programs/?college_id`

#### Request `GET`

```
/api/programs?college_id=81521f18-76e6-41fb-81a6-34e8076cd684
```

#### Response
```
{
    "id": "6e7441c6-168e-4a1b-9b1e-a191914d44e0",
    "englishName": "Level 1",
    "arabicName": "المستوى الاول",
    "collegeId": "81521f18-76e6-41fb-81a6-34e8076cd684",
    "programCode": "CEE623",
    "creditHours": 38,
    "mandatoryHours": 8,
    "optionalHours": 30,
    "projectQualifyingHours": 0,
    "feesType": "SEMESTERFIXED",
    "summerFeesType": "SEMESTERFIXED",
    "allowedHrs": "SEMESTER",
    "prerequisiteProgramId": null,
    "gradeLowering": 65,
    "attemptsToLowerGrade": 3,
    "failureGrade": 15,
    "degree": "DIPLOMA",
    "hasSummerSemester": null,
    "system": "CREDIT",
    "maxGrade": null
  },
  {
    "id": "4517755c-0f9e-459d-bc05-81212a8e664f",
    "englishName": "Electrical Engineering",
    "arabicName": "الهندسة الكهربية",
    "collegeId": "81521f18-76e6-41fb-81a6-34e8076cd684",
    "programCode": "BSMO46",
    "creditHours": 42,
    "mandatoryHours": 12,
    "optionalHours": 30,
    "projectQualifyingHours": 0,
    "feesType": "YEARFIXED",
    "summerFeesType": "COURSES",
    "allowedHrs": "CUMULATIVE",
    "prerequisiteProgramId": null,
    "gradeLowering": 60,
    "attemptsToLowerGrade": 6,
    "failureGrade": 12,
    "degree": "BACHELOR",
    "hasSummerSemester": null,
    "system": "CREDIT",
    "maxGrade": null
  },......
```

### Get specefic program `/api/programs/:id`

#### Request `GET`
```
/api/programs/23026360-a448-4584-b1c0-d78904f487b8
```

#### Response
```
{
  "id": "23026360-a448-4584-b1c0-d78904f487b8",
  "englishName": "Mechanical Engineering",
  "arabicName": "الهندسة الميكانيكية",
  "collegeId": "81521f18-76e6-41fb-81a6-34e8076cd684",
  "programCode": "BCE589",
  "creditHours": 34,
  "mandatoryHours": 15,
  "optionalHours": 12,
  "projectQualifyingHours": 7,
  "feesType": "CREDITHOURS",
  "summerFeesType": "SEMESTERFIXED",
  "allowedHrs": "CUMULATIVE",
  "prerequisiteProgramId": null,
  "gradeLowering": 50,
  "attemptsToLowerGrade": 2,
  "failureGrade": 12,
  "degree": "DIPLOMA",
  "hasSummerSemester": null,
  "system": "CREDIT",
  "maxGrade": null
}
```

### Create program `/api/programs/`

#### Request `POST`
```
{
  "englishName": "Level 1",
  "arabicName": "المستوى الاول",
  "collegeId": "81521f18-76e6-41fb-81a6-34e8076cd684",
  "programCode": "CEE623",
  "creditHours": "optional",
  "mandatoryHours": "optional",
  "optionalHours": "optional",
  "projectQualifyingHours": "optional",
  "feesType": "from enum",
  "summerFeesType": "from enum",
  "allowedHrs": "SEMESTER",
  "prerequisiteProgramId": "optional",
  "gradeLowering": "optional",
  "attemptsToLowerGrade": "optional",
  "failureGrade": "optional",
  "degree": "optional",
  "hasSummerSemester": "optional",
  "system": "credit",
  "maxGrade": "optional"
}
** englishName, arabicName, collegeId, programCode, feesType, summerFeesType, allowedHrs and system fileds are mandatory
** programCode field must be unique
** prerequisiteProgramId must be correct
```

#### Response
```
201 and sends created data upon success
400 if college_id is missing
```

### Update program `/api/programs/:id`

#### Request `PUT`
```
{
    "programCode": "AE56",
    "maxGrade": 110
}
```

#### Response
```
200 ok along with updated object
```

### Delete program `/api/programs/:id`

#### Request `DELETE`
```
/api/programs/2de38f40-f778-4022-bb44-b8ce45d47eed
```

#### Response
```
** 200 OK along with the deleted object
{
  "id": "2de38f40-f778-4022-bb44-b8ce45d47eed",
  "englishName": "ِِArchitecture Engineering",
  "arabicName": "المستوى الاول",
  "collegeId": "81521f18-76e6-41fb-81a6-34e8076cd684",
  "programCode": "AE56",
  "creditHours": 80,
  "mandatoryHours": 60,
  "optionalHours": 20,
  "projectQualifyingHours": 65,
  "feesType": "CREDITHOURS",
  "summerFeesType": "CREDITHOURS",
  "allowedHrs": "SEMESTER",
  "prerequisiteProgramId": null,
  "gradeLowering": 15,
  "attemptsToLowerGrade": 3,
  "failureGrade": 60,
  "degree": "DIPLOMA",
  "hasSummerSemester": true,
  "system": "CREDIT",
  "maxGrade": 10
}
```
______________________

