import Sequelize from 'sequelize'

import User from '../app/models/User'

import config from '../config/database'
import File from '../app/models/File'
import Choice from '../app/models/Choice'
import Question from '../app/models/Question'

const models = [User, File, Choice, Question]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(config)

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new Database()
