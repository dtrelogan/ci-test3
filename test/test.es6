import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import TestForm from '../index.js';
import assert from 'assert';


let form, input;

const html = ReactDOMServer.renderToString(
  <html lang='en'>
    <head>
      <meta charSet='utf-8'/>
      <title>CI Test</title>
    </head>
    <body>
      <TestForm
        model={{test: 'hello branch 1!'}}
        grabFormRef={c => form = c}
        grabInputRef={c => input = c}
        />
    </body>
  </html>
);

describe('App', () => {
  it('injects the model data', () => {
    assert.equal('hello branch 1!', input.props.fieldState.getValue());
  });
  it('validates onChange', () => {
    assert.equal(false, input.props.fieldState.isValidated());
    form.setState = (updates) => {
      form.state = Object.assign(form.state, updates);
    }
    input.props.handleValueChange('a');
    const fi = form.formState.getFieldState('test');
    assert.equal('a', fi.getValue());
    assert.equal(true, fi.isValidated());
    assert.equal(true, fi.isInvalid());
    assert.equal('Test must have a minimum length of 8', fi.getMessage());
  });
});
