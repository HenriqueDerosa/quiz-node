import Sequelize, { Model } from 'sequelize'

class Questions extends Model {
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
    this.hasMany(models.Options, {
      as: 'options',
    })
  }
}

export default Questions
