# MCQ bank

## users

- index `/users` [get]
- create `/users` [post]
- read `/users/:id` [get]
- update [TokenRequired] `/users/:id` [put]
- delete [AdminTokenRequired] `/users/:id` [delete]

## questions

- create [ModTokenRequired] `/questions` [post]
- show `/questions/:id` [get]
- edit [ModTokenRequired] `/questions/:id` [put]
- delete [ModTokenRequired] `/questions/:id` [delete]

## mcqs

- create [ModTokenRequired] `/mcqs` [post]
- show `/mcqs/:id` [get]
- edit [ModTokenRequired] `/mcqs/:id` [put]
- delete [ModTokenRequired] `/mcqs/:id` [delete]

## sheets

- index `/group/:id/sheets` [get]
- create [ModTokenRequired] `/group/:id/sheets` [post]
- show `/sheets/:id` [get]

## groups

- index `/groups` [get]
- create [ModTokenRequired] `/groups` [post]
- show `/groups/:id` [get]
- update [ModTokenRequired] `/groups` [put]
- delete [ModTokenRequired] `/groups` [delete]
- show members [ModTokenRequired] `/groups/:id/members` [get]
- add member [ModTokenRequired] `/groups/:id/members` [post]
- remove member [ModTokenRequired] `/groups/:id/members` [delete]

## universities

- index `/universities` [get]
- create [AdminTokenRequired] `/universities` [post]
- show `/universities/:id` [get]

---

<!-- datashape is a rough representation of data in database. They aren't necessarily one to one with tables -->

## datashape

## users

    - id
    - name
    - email
    - role
    - type
    - status
    - password
    - university_id: ForeignKey(universities)

## groups

    - id
    - name
    - subject
    - moderator_id: ForeignKey(users)
    - university_id: ForeignKey(universities)
    - sheets: many to many
    - members: many to many

## questions

    - id
    - question
    - answer
    - category
    - reference

## mcqs

    - id
    - question
    - answers: TBD
    - correct_answer
    - category

<!-- datashape for any pdf including sheets and references -->

## sheets

    - id
    - questions: many to many
    - mcqs: many to many

## universities

    - id
    - name
