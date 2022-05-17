const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conm')

const User = require('./models/User')
const Adress = require('./models/Adress')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())
app.use(express.static('public'))

app.post('/users/create', async (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if (newsletter === 'on') { // checkbox vem como "on" quando está marcado 
        newsletter = true
    }

    await User.create({
        name,
        occupation,
        newsletter
    })
    res.redirect('/')
})

app.post('/users/delete', async (req, res) => {
    const id = req.body.id

    await User.destroy({
        where: {
            id: id
        }
    })

    res.redirect('/')
})

app.post('/adress/create', async (req, res) => {
    const UserId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    const adress = {
        UserId,
        street,
        number,
        city
    }

    await Adress.create(adress)

    res.redirect(`/users/edit/${UserId}`)
})

app.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findOne({
            include: Adress,
            where: {
                id: id
            }
        })

        res.render('userEdit', {
            user: user.get({
                plain: true
            })
        })
    } catch (error) {
        console.log(error)
    }


    
})

/* sem tabelas relacionadas
app.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({
        raw: true,
        where: {
            id: id
        }
    })

    res.render('userEdit', {
        user
    })
})*/

app.post('/users/update', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    const newsletter = req.body.newsletter;

    if (newsletter == "on") {
        newsletter = true
    } else {
        newsletter = false
    }

    const userData = {
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(userData, {
        where: {
            id: id
        }
    })

    res.redirect('/')
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({
        raw: true,
        where: {
            id: id
        }
    })

    res.render('userview', {
        user
    })
})

app.get('/users', (req, res) => {
    res.render('adduser')
})

// formulario de registro novo livro
app.get('/', async (req, res) => {
    const users = await User.findAll({
        raw: true
    })

    res.render('home', {
        users
    })
})

conn
    .sync()
    //.sync({
    //  force: true
    //}) // força recriar tabelas, limpas (só usar em desenvolvimento, nunca em produção)
    .then(() => {
        app.listen(3000)
    }).catch(err => console.log(err))