import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'

import authMiddleware from './app/middlewares/auth'
import PageController from './app/controllers/PageController'
import QuestionController from './app/controllers/QuestionController'

const routes = new Router()

routes.get('/', async (req, res) => {
  return res.json({ message: 'Hello' })
})

/** Question and answer */
routes.get('/questions', QuestionController.index)

/** User authentication */
routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)
routes.post('/page', PageController.store)

routes.get('/page', PageController.index)

routes.delete('/page/:id', PageController.delete)

routes.use(authMiddleware)

routes.put('/users', UserController.update)
routes.put('/page/:id', PageController.update)

export default routes
