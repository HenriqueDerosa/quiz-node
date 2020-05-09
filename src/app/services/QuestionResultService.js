import Question from '../models/Question'

class QuestionResultService {
  async run({ question_id }) {
    const question = await Question.findByPk(order_id)

    if (!question) {
      throw new Error('Question not found')
    }

    return question
  }
}

export default new QuestionResultService()
