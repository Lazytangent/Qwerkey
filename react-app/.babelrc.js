const plugins = [
  [
    'babel-plugin-import',
    {
      'libraryName': '@material-ui/core',
      'libraryDirectory': 'esm',
      'camel2DashComponentName': false
    },
    'core'
  ],
  [
    'bable-plugin-import',
    {
      'libraryName': '@material-ui/icons',
      'libraryDirectory': 'esm',
      'camel2DashComponentName': false
    },
    'icons'
  ]
];

module.exports = { plugins };
