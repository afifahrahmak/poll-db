# Poll DB Review Buddy

[Soal](https://docs.google.com/document/d/1yRb_zWywy2jPwYMyl1LD1utRyP269WPsCrUppMYxTUU/edit)

- Schema
- Database
- node postgres
- MVC
- Instance 


> jangan lupa npm init dan .gitignore


Diketahui akan 3 Table 

### Politicians

| Column        | Data Type    | Constrain / Modifier |
|---------------|--------------|----------------------|
| id            | SERIAL       | PRIMARY KEY          |
| name          | VARCHAR(30)  | NOT NULL             |
| party         | VARCHAR(5)   | NOT NULL             |
| location      | VARCHAR(5)   | NOT NULL             |
| grade_current | FLOAT        | NOT NULL             |


### Voters 

| Column     | Data Type   | Constrain / Modifier |
|------------|-------------|----------------------|
| id         | SERIAL      | PRIMARY KEY          |
| first_name | VARCHAR(25) | NOT NULL             |
| last_name  | VARCHAR(25) | NOT NULL             |
| gender     | VARCHAR(6)  | NOT NULL             |
| age        | INT         | NOT NULL             |


### Votes 
Berupa junction table


### Step by Step
```txt
npm init -y
npm i pg 
buat gitignore 
buat connection
setup database
```