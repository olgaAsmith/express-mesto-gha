class ValidError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidError';
    this.status = 400;
  }
}

module.exports = ValidError;
