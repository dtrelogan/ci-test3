'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var form = void 0,
    input = void 0;

var html = _server2.default.renderToString(_react2.default.createElement(
  'html',
  { lang: 'en' },
  _react2.default.createElement(
    'head',
    null,
    _react2.default.createElement('meta', { charSet: 'utf-8' }),
    _react2.default.createElement(
      'title',
      null,
      'CI Test'
    )
  ),
  _react2.default.createElement(
    'body',
    null,
    _react2.default.createElement(_index2.default, {
      model: { test: 'hello branch 12!' },
      grabFormRef: function grabFormRef(c) {
        return form = c;
      },
      grabInputRef: function grabInputRef(c) {
        return input = c;
      }
    })
  )
));

describe('App', function () {
  it('injects the model data', function () {
    _assert2.default.equal('hello branch 12!', input.props.fieldState.getValue());
  });
  it('validates onChange', function () {
    _assert2.default.equal(false, input.props.fieldState.isValidated());
    form.setState = function (updates) {
      form.state = Object.assign(form.state, updates);
    };
    input.props.handleValueChange('a');
    var fi = form.formState.getFieldState('test');
    _assert2.default.equal('a', fi.getValue());
    _assert2.default.equal(true, fi.isValidated());
    _assert2.default.equal(true, fi.isInvalid());
    _assert2.default.equal('Test must have a minimum length of 8', fi.getMessage());
  });
});
