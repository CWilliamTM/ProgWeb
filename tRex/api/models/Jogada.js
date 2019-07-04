module.exports = {
  attributes: {
    jogador: {
      type: 'number',
      columnType: 'integer',
      required: true
    },
    pontuacao: {
      type: 'number',
      columnType: 'integer'
    },
    data: {
      type: 'string',
      maxLength: 45,
    },
  },
};
