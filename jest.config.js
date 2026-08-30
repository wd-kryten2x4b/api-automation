const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  testPathIgnorePatterns: ["/node_modules/", "/Controller/"],
  
  reporters: [
    'default',
    ['jest-junit',
      {
        outputDirectory: 'reports'
      }
    ],
    ['jest-html-reporters',
    {
      publicPath: 'reports'
    } 
    ]
  ]
};