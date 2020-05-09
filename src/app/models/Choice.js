import Sequelize, { Model } from 'sequelize'

class Choice extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Question, {
      foreignKey: 'question_id',
      as: 'question',
    })
  }
}

export default Choice
