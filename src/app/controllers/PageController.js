import * as yup from 'yup'
import Page from '../models/Page'

import { removeAccentuation } from '../../utils/string'

/**
 * Controllers always have only 'index, show, store, update, delete'
 */
class PageController {
  async index(req, res) {
    const pages = await Page.findAll({
      order: [['createdAt', 'DESC']],
    })

    return res.json(pages)
  }

  async store(req, res) {
    const schema = yup.object().shape({
      title: yup.string().required(),
      category: yup.string().required(),
      body: yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'You must send: title, category and body',
      })
    }

    const slug = removeAccentuation(req.body.title)
      .split(' ')
      .join('-')
      .toLowerCase()

    const { id, title, category, body } = await Page.create({
      slug,
      ...req.body,
    })

    return res.json({
      id,
      title,
      slug,
      category,
      body,
    })
  }

  async update(req, res) {
    const schema = yup.object().shape({
      title: yup.string(),
      category: yup.string(),
      body: yup.string(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'No field to update',
      })
    }

    const { id } = req.params

    const { title, category, body } = req.body
    const page = await Page.findByPk(id)

    await page.update(req.body)

    return res.json({ id, title, category, body })
  }

  async delete(req, res) {
    const { id } = req.params
    const page = await Page.findByPk(id)

    if (!page) {
      return res.status(404).json({ error: 'page not found' })
    }

    await Page.destroy({
      where: {
        id,
      },
    })

    return res.status(200).json({
      success: `page ${id} was successfully removed`,
    })
  }
}

export default new PageController()
