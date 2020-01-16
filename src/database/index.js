import Sequelize from 'sequelize'

import User from '../app/models/User'

import databaseConfig from '../config/database'
import Page from '../app/models/Page'
import Questions from '../app/models/Questions'
import Options from '../app/models/Options'

const models = [Questions, Options]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)
    models
      .map(model => model.init(this.connection))
      .map(model => {
        // console.log(model.associate && String(model.associate))
        return model.associate && model.associate(this.connection.models)
      })
  }
}

export default new Database()
