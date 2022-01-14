const pool = require('./config/connection')
const fs = require('fs')

let dataPoliticians = JSON.parse(fs.readFileSync('./json/politicians.json', 'utf-8'))
let dataVoters = JSON.parse(fs.readFileSync('./json/voters.json', 'utf-8'))
let dataVotes = JSON.parse(fs.readFileSync('./json/votes.json', 'utf-8'))

let query1 = `INSERT INTO "Politicians" (name, party, location, grade_current) VALUES `
let query2 = `INSERT INTO "Voters" (first_name, last_name, gender, age) VALUES `
let query3 = `INSERT INTO "Votes" ("VoterId", "PoliticianId") VALUES `

dataPoliticians = dataPoliticians.map(el => `('${el.name}', '${el.party}', '${el.location}', ${el.grade_current})`)
query1 += dataPoliticians.join(', ')

dataVoters = dataVoters.map(el => `('${el.first_name}', '${el.last_name}', '${el.gender}', ${el.age})`)
query2 += dataVoters.join(', ')

dataVotes = dataVotes.map(el => `(${el.VoterId}, ${el.PoliticianId})`)
query3 += dataVotes.join(', ')

pool.query(query1, (err, res) => {
    if (err) console.log(err, 'failed seed pol')
    else {
        console.log('succcess seed pol')
        pool.query(query2, (err, res) => {
            if (err) console.log(err, 'failed seed voters')
            else {
                console.log('succcess seed voters')
                pool.query(query3, (err, res) => {
                    if (err) console.log(err, 'failed seed votes')
                    else {
                        console.log('succcess seed votes')
                    }
                })
            }
        })
    }
})

