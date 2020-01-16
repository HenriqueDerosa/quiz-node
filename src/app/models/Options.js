import Sequelize, { Model } from 'sequelize'

class Options extends Model {
  static init(connection) {
    super.init(
      {
        title: Sequelize.STRING,
      },
      {
        sequelize: connection,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Questions, {
      foreignKey: 'question_id',
    })
  }
}

export default Options
