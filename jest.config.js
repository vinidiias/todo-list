module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Permite transformar arquivos JS e JSX
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(axios)/)', // Permite que o Jest transforme o Axios
    ],
  };
  