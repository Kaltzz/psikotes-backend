import express, {type Request, type Response} from 'express'
import router from './routes'
import cors from 'cors'

const app = express()


app.use(cors({
  origin: 'http://localhost:4000',
  credentials: true,
}))

app.use(express.json())

app.use('/api', router)

export default app