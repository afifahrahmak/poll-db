class View {
    static showErr(msg) {
        console.log(msg)
    }
    static show(data) {
        console.log(data)
    }

    static showAdd(data) {
        console.log('Success add new politician')
        console.log(data)
    }

    static showDelete(total) {
        console.log(`Success delete politician, total : ${total}`)
    }

    static table(data) {
        console.log(data)
        console.table(data, ['id', 'name', 'party', 'grade'])
    }
}

module.exports = View