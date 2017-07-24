'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFormstate = require('react-formstate');

var _reactFormstateValidation = require('react-formstate-validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_reactFormstate.FormState.rfsProps.updateFormState.suppress = true;

_reactFormstateValidation.validationAdapter.plugInto(_reactFormstate.FormState);

var Input = function Input(_ref) {
  var label = _ref.label,
      value = _ref.value,
      help = _ref.help,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      null,
      label
    ),
    _react2.default.createElement('input', { type: 'text', value: value, onChange: onChange, onBlur: onBlur }),
    _react2.default.createElement(
      'div',
      null,
      help
    )
  );
};

var RfsInput = function (_Component) {
  _inherits(RfsInput, _Component);

  function RfsInput(props) {
    _classCallCheck(this, RfsInput);

    return _possibleConstructorReturn(this, (RfsInput.__proto__ || Object.getPrototypeOf(RfsInput)).call(this, props));
  }

  _createClass(RfsInput, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          grabRef = _props.grabRef,
          fieldState = _props.fieldState,
          handleValueChange = _props.handleValueChange,
          showValidationMessage = _props.showValidationMessage,
          other = _objectWithoutProperties(_props, ['grabRef', 'fieldState', 'handleValueChange', 'showValidationMessage']);

      if (grabRef) {
        grabRef(this);
      }

      return _react2.default.createElement(Input, _extends({
        value: fieldState.getValue(),
        help: fieldState.getMessage(),
        onChange: function onChange(e) {
          return handleValueChange(e.target.value);
        },
        onBlur: showValidationMessage
      }, other));
    }
  }]);

  return RfsInput;
}(_react.Component);

;

var TestForm = function (_Component2) {
  _inherits(TestForm, _Component2);

  function TestForm(props) {
    _classCallCheck(this, TestForm);

    var _this2 = _possibleConstructorReturn(this, (TestForm.__proto__ || Object.getPrototypeOf(TestForm)).call(this, props));

    _this2.formState = new _reactFormstate.FormState(_this2);
    _this2.state = _this2.formState.createUnitOfWork().injectModel(props.model);
    props.grabFormRef(_this2);
    return _this2;
  }

  _createClass(TestForm, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        _reactFormstate.Form,
        { formState: this.formState, onSubmit: function onSubmit(e) {
            return _this3.handleSubmit(e);
          } },
        _react2.default.createElement(RfsInput, {
          formField: 'test',
          label: 'Test',
          required: true,
          fsv: function fsv(v) {
            return v.minLength(8);
          },
          grabRef: this.props.grabInputRef
        }),
        _react2.default.createElement('input', { type: 'submit', value: 'Submit', disabled: this.formState.isInvalid() })
      );
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      var model = this.formState.createUnitOfWork().createModel();
      if (model) {
        alert(JSON.stringify(model));
      }
    }
  }]);

  return TestForm;
}(_react.Component);

exports.default = TestForm;
