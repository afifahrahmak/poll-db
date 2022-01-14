let pool = require('./config/connection')

let queryPoliticians = `CREATE TABLE IF NOT EXISTS "Politicians"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    party VARCHAR(2) NOT NULL,
    location VARCHAR(3) NOT NULL,
    grade_current FLOAT NOT NULL
);
`

let queryVoters = `CREATE TABLE IF NOT EXISTS "Voters"(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    gender VARCHAR NOT NULL,
    age INTEGER NOT NULL
);
`

let queryVotes = `CREATE TABLE IF NOT EXISTS "Votes"(
    id SERIAL PRIMARY KEY,
    "VoterId" INTEGER,
    FOREIGN KEY ("VoterId")
        REFERENCES "Voters"(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    "PoliticianId" INTEGER,
    FOREIGN KEY ("PoliticianId")
        REFERENCES "Politicians"(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)`

pool.query(queryPoliticians, (err, res) => {
    if (err) console.log('failed on create politicians', err)
    else {
        console.log('success create table politicians')
        pool.query(queryVoters, (err, res) => {
            if (err) console.log('failed on create voters', err)
            else {
                console.log('success create table voters')
                pool.query(queryVotes, (err, res) => {
                    if (err) console.log('failed on create votes', err)
                    else {
                        console.log('success create table votes')
                    }
                })
            }
        })
    }
})