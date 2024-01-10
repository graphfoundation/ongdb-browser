/*
 * Copyright (c) "Graph Foundation"
 * Graph Foundation, Inc. [https://graphfoundation.org]
 *
 * This file is part of ONgDB.
 *
 * ONgDB is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// React markdown (and many of it's dependencies) are only exported as an esmodule
// Jest needs them to be transpiled to commonjs before running
// https://github.com/facebook/create-react-app/issues/11946
const reactMarkdownESModuleDeps =
  'react-markdown|vfile|vfile-message|markdown-table|unist-.*|unified|bail|is-plain-obj|trough|remark-.*|mdast-util-.*|escape-string-regexp|micromark.*|decode-named-character-reference|character-entities|property-information|hast-util-whitespace|space-separated-tokens|comma-separated-tokens|pretty-bytes|ccount'

module.exports = {
  // TypeScript files will be handled by ts-jest, and JavaScript files will be handled by babel-jest.
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: [
    'raf/polyfill.js',
    'jest-canvas-mock',
    '<rootDir>/node_modules/regenerator-runtime/runtime'
  ],
  setupFilesAfterEnv: [require.resolve('./test_utils/setupTests.js')],
  testPathIgnorePatterns: [
    '/e2e_tests/',
    '/coverage/',
    '/dist/',
    '/node_modules/'
  ],
  transformIgnorePatterns: [
    `/node_modules/(?!(@neo4j-devtools/word-color|lodash-es|@neo4j/browser-lambda-parser|react-dnd|dnd-core|monaco-editor|antlr4|@neo4j-cypher/(.+)|internmap|${reactMarkdownESModuleDeps}|d3-[^-]+))`
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|html|css)$':
      '<rootDir>/test_utils/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/test_utils/__mocks__/styleMock.js',
    '^browser-styles(.*)$': '<rootDir>/src/browser/styles$1',
    '^browser-components(.*)$': '<rootDir>/src/browser/components$1',
    '^browser-services(.*)$': '<rootDir>/src/browser/services$1',
    '^browser-hooks(.*)$': '<rootDir>/src/browser/hooks$1',
    'worker-loader': '<rootDir>/test_utils/__mocks__/workerLoaderMock.js',
    'project-root(.*)$': '<rootDir>$1',
    '^monaco-editor$':
      '<rootDir>/node_modules/monaco-editor/esm/vs/editor/editor.main.js',
    '^neo4j-arc/graph-visualization$':
      '<rootDir>/src/neo4j-arc/graph-visualization',
    '^neo4j-arc/common$': '<rootDir>/src/neo4j-arc/common'
  },
  modulePaths: ['<rootDir>/src', '<rootDir>/src/shared'],
  collectCoverageFrom: ['**/src/**/*.ts', '**/src/**/*.tsx'],
  coverageThreshold: {
    global: {
      statements: 45,
      branches: 35,
      functions: 35,
      lines: 45
    }
  },
  globals: {
    SEGMENT_KEY: 'a-segment-key'
  },
  testResultsProcessor: 'jest-bamboo-reporter'
}
