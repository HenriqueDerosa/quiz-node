import { Op } from 'sequelize'
import Question from '../models/Question'
import Choice from '../models/Choice'

class QuestionController {
  async store(req, res) {
    try {
      const { title } = req.body

      const question = await Question.create({ title })

      return res.status(200).json(question)
    } catch (err) {
      return res.json(err)
    }
  }

  // lists all questions
  async index(req, res) {
    const { q } = req.query

    const filter = q && {
      question: {
        [Op.iLike]: `%${q}%`,
      },
    }
    const questions = await Question.findAll({
      where: {
        ...filter,
      },
    })

    return res.status(200).json(questions)
  }

  // updates values of specified question
  async update(req, res) {
    const { id } = req.params

    const question = await Question.findByPk(id)

    if (!question) {
      return res.status(404).json({ error: 'Question does not exists.' })
    }

    const { title } = req.body

    if (title) question.title = title

    const updatedQuestion = await question.save()

    return res.json(updatedQuestion)
  }

  // delete specified question
  async delete(req, res) {
    const { id } = req.params

    const question = await Question.findByPk(id)

    if (!question) {
      return res.status(404).json({ error: 'Question does not exists' })
    }

    try {
      await Question.destroy({ where: { id } })

      return res.status(204).send()
    } catch (err) {
      return res.json({ error: err })
    }
  }
}

export default new QuestionController()
