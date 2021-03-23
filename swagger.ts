// Libraries
import { Options } from 'swagger-jsdoc'

// Package
import packageInformation from './package.json'

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: packageInformation.name,
      version: packageInformation.version,
      description: packageInformation.description,
    },
  },
  apis: ['./index.ts', './src/routers/*.ts', './src/routers/modules/*.ts'],
}

export default swaggerOptions
