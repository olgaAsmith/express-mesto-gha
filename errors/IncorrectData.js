class IncorrectData extends Error {
  constructor() {
    super();
    this.statusCode = 401;
    this.message = 'Неверный логин или пароль';
  }
}

module.exports = IncorrectData;
