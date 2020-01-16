import Sequelize, { Model } from 'sequelize'

class Page extends Model {
  static init(connection) {
    super.init(
      {
        title: Sequelize.STRING,
        slug: Sequelize.STRING,
        category: Sequelize.STRING,
        body: Sequelize.TEXT,
      },
      {
        sequelize: connection,
      }
    )

    return this
  }
}

export default Page
