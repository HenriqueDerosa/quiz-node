import Mail from '../../lib/Mail'

class UserCreationMail {
  get key() {
    return 'UserCreationMail'
  }

  async handle({ user }) {
    const context = {
      user,
    }

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: `Bem vindo ${user.name}`,
      template: 'create-user',
      context,
    })
  }
}

export default new UserCreationMail()
