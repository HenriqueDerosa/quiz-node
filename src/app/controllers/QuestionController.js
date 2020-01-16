import * as yup from 'yup'
import Questions from '../models/Questions'
import Options from '../models/Options'

import { removeAccentuation } from '../../utils/string'

class QuestionController {
  async index(req, res) {
    const questions = await Questions.findAll({
      include: [{ model: Options, as: 'options' }],
    })

    return res.json(questions)
  }
}

export default new QuestionController()
