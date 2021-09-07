
console.log("If module not found, install express globally `npm i express -g`!");
const Gun = require('gun')
const port    = process.env.PORT || 8765
const app = require('express')()
app.use(Gun.serve)
const server = require('http').Server(app)
require('gun/axe');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()


nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        
        const gun = Gun({ file: 'data', web: server })
        global.gun = gun; /// make global to `node --inspect` - debug only
        console.log(`> Ready on http://localhost:${port}`)
    })
})