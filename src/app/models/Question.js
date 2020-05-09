import Sequelize, { Model } from 'sequelize'

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        question: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Choice, {
      foreignKey: 'choice_id',
      as: 'choice',
    })
  }
}

export default Question
