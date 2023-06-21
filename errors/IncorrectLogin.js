class IncorrectLogin extends Error {
  constructor() {
    super();
    this.statusCode = 401;
    this.message = 'Доступно только для авторизованных пользователей';
  }
}

module.exports = IncorrectLogin;
