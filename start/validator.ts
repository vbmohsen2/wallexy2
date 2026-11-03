/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('size', (value, [size], options) => {
  if (typeof value !== 'string') {
    return
  }
  if (value.length !== size) {
    options.errorReporter.report(
      options.pointer,
      'size',
      'size is not correct',
      options.arrayExpressionPointer,
      {size}
    )
  }
})

validator.rule('gt', (value, [size], options) => {
  if (typeof value !== 'number') {
    return
  }
  if (value < size) {
    options.errorReporter.report(
      options.pointer,
      'gt',
      'given number is should be bigger',
      options.arrayExpressionPointer,
      {size}
    )
  }
})


validator.rule('digits', (value, [size], options) => {
  if (typeof value !== 'string') {
    return
  }

  value = value.replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728))

  if (value.length !== size) {
    options.errorReporter.report(
      options.pointer,
      'digits',
      'given number is should be equal with ' + size,
      options.arrayExpressionPointer,
      { size }
    )
  }
})
