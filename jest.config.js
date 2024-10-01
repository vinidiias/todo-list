module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Transforma arquivos JS e JSX
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(axios)/)', // Permite que o Jest transforme o Axios
    ],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'], // Adiciona extensões
    testEnvironment: 'jsdom', // Para aplicações React
  };
  