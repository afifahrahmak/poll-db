const Model = require('../models/model')
const View = require('../views/view')

class Controller {
    static query1(req, res) {
        Model.query1((err, politicians) => {
            if (err) res.send(err)
            // else res.send(politicians)
            else res.render('page1', { politicians })
        })
    }
    static query2() {
        Model.query2((err, polticianVotes) => {
            if (err) View.showErr(err)
            else View.show(polticianVotes)
        })
    }

    static add(name, party, location, grade_current) {
        Model.add(name, party, location, grade_current, (err, politician) => {
            if (err) View.showErr(err)
            else View.showAdd(politician)
        })
    }

    static delete(party) {
        Model.delete(party, (err, total) => {
            if (err) View.showErr(err)
            else View.showDelete(total)
        })
    }
}

module.exports = Controller