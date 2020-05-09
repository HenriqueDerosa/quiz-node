import Sequelize, { Model } from 'sequelize'

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    )

    return this
  }
}

export default Question
