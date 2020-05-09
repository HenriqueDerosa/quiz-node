import Sequelize, { Model } from 'sequelize'

class Choice extends Model {
  static init(sequelize) {
    super.init(
      {
        text: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }
}

export default Choice
