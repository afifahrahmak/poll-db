const pool = require('../config/connection')

class Politician {
    constructor(obj) {
        this.id = obj.id
        this.name = obj.name
        this.party = obj.party
        this.location = obj.location
        this.grade_current = obj.grade_current
    }
}

class PoliticianVote {
    constructor(name, totalVote) {
        this.name = name
        this.totalVote = totalVote
    }
}

class Model {
    static query1(cb) {
        let query = `SELECT * FROM "Politicians"
        WHERE party = 'R' AND grade_current BETWEEN 9 AND 11;`
        pool.query(query, (err, res) => {
            if (err) cb(err)
            else {
                let data = res.rows.map(el => new Politician(el))
                cb(null, data)
            }
        })
    }

    static query2(cb) {
        let query = `SELECT p.name, COUNT(v.*) FROM "Politicians" p
	        JOIN "Votes" v ON p.id = v."PoliticianId"
	        WHERE p.name LIKE '%Adam%'
	        GROUP BY p.name
	        ORDER BY COUNT(v.*)`
        pool.query(query, (err, res) => {
            if (err) cb(err)
            else {
                let data = res.rows.map(el => new PoliticianVote(el.name, el.count))
                cb(null, data)
            }
        })
    }

    static add(name, party, location, grade_current, cb) {
        let query = `INSERT INTO "Politicians" (name, party, location, grade_current) 
        VALUES ('${name}', '${party}', '${location}', ${grade_current})
        RETURNING *`
        pool.query(query, (err, res) => {
            if (err) cb(err)
            else {
                let data = new Politician(res.rows[0])
                cb(null, data)
            }
        })
    }

    static delete(party, cb) {
        let query = `DELETE FROM "Politicians" WHERE party = '${party}';`
        pool.query(query, (err, res) => {
            if (err) cb(err)
            else {
                cb(null, res.rowCount)
            }
        })
    }


}

module.exports = Model