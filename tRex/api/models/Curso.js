module.exports = {
    attributes: {
      nome: {
        type: 'string',
        maxLength: 64,
        required: true
      },
      sigla: {
        type: 'string',
        maxLength: 4,
        minLength: 4
      },
      descricao: {
        type: 'string'
      },
    },
  };
  