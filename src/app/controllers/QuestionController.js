import * as yup from 'yup'
import Questions from '../models/Questions'
import Options from '../models/Options'

import { removeAccentuation } from '../../utils/string'

class QuestionController {
  async index(req, res) {
    const result = await Questions.findAll({
      include: [{ model: Options, as: 'options' }],
    })

    return res.json(result)
  }

  async store(req, res) {
    const { title, options } = req.body

    const schema = yup.object().shape({
      title: yup.string().required(),
      options: yup
        .array()
        .of(
          yup.object().shape({
            title: yup.string().required(),
          })
        )
        .min(2, 'add at least two options')
        .required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'You must send: title, and an array of options',
        schema,
      })
    }

    const savedQuestion = await Questions.create({
      title,
    })

    const questionOptions = options.map(o => ({
      ...o,
      question_id: savedQuestion.id,
    }))

    const savedOptions = await Options.bulkCreate(questionOptions)

    return res
      .status(200)
      .json({ question: savedQuestion, options: savedOptions })
  }
}

export default new QuestionController()
