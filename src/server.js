import express from 'express';
import taskRouter from './routes/task.js'
import sequelize from './database.js'

const app = express()
const port = 3333
app.use(express.json())
app.use(express.urlencoded())

sequelize.sync({ force: false }, () => {
    console.info('Database connected')
})

app.use('/tasks', taskRouter)

app.listen(port, () => {
    console.info(`Server is running on port ${port}`)
})