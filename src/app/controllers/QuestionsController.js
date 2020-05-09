import { Op } from 'sequelize'
import Question from '../models/Question'

class QuestionsController {
  async store(req, res) {
    try {
      const question = await Question.create(req.body)

      await question.reload({
        attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
        include: [
          {
            model: Recipient,
            as: 'recipient',
            attributes: [
              'id',
              'name',
              'address',
              'address2',
              'number',
              'state',
              'city',
              'zipcode',
            ],
          },
          {
            model: Deliverymen,
            as: 'deliveryman',
            attributes: ['id', 'name', 'email'],
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['url', 'path', 'name'],
              },
            ],
          },
        ],
      })

      return res.status(200).json(question)
    } catch (err) {
      return res.json(err)
    }
  }

  // lists all questions
  async index(req, res) {
    const { q } = req.query

    const filter = q && {
      product: {
        [Op.iLike]: `%${q}%`,
      },
    }

    const questions = await Question.findAll({
      where: {
        ...filter,
      },
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'address',
            'address2',
            'number',
            'state',
            'city',
            'zipcode',
          ],
        },
        {
          model: Deliverymen,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['url', 'path', 'name'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'path', 'name'],
        },
      ],
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
        'updatedAt',
      ],
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

    const { question, active } = req.body

    if (question) question.question = question
    if (active) question.active = active

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

export default new QuestionsController()
