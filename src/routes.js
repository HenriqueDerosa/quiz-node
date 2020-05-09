import multer from 'multer'
import multerConfig from './config/multer'
import { Router } from 'express'

import validateUser from './app/validators/user'
import validateSession from './app/validators/session'

import user from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/auth'
import FileController from './app/controllers/FileController'
import QuestionController from './app/controllers/QuestionController'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/login', validateSession.store, SessionController.store)
routes.post('/user', validateUser.store, user.store)

// Files
routes.post('/files', upload.single('file'), FileController.store)

routes.use(authMiddleware)
routes.get('/user/:id', user.index)

// Questions
routes.delete('/question/:id', QuestionController.delete)

export default routes
