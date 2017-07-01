module.exports = wallaby => ({
  files: [
    'src/**/*.js',
    {
      pattern: 'src/**/*.test.js',
      ignore: true
    }
  ],
  tests: [
    'src/**/*.test.js'
  ],
  compilers: {
    'src/**/*.js': wallaby.compilers.babel()
  },
  filesWithNoCoverageCalculated: ['src/**/*-helper.js', 'src/**/*test.js'],
  testFramework: 'mocha',
  env: {
    type: 'node'
  },
  bootstrap: () => {
    require('./src/test-helper'); //eslint-disable-line
  }
});
