import express, {type Request, type Response} from 'express'
import router from './routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()


app.use(cors({
  // origin: 'http://localhost:3000', //jika local
  origin: 'https://psikotes-frontend.vercel.app',
  credentials: true,
}))

app.use(cookieParser())

app.use(express.json())

app.use('/api', router)

export default app