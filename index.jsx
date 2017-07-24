import React, { Component } from 'react';
import { FormState, Form } from 'react-formstate';
FormState.rfsProps.updateFormState.suppress = true;
import { validationAdapter } from 'react-formstate-validation';
validationAdapter.plugInto(FormState);

const Input = ({label, value, help, onChange, onBlur}) => {
  return (
    <div>
      <div>{label}</div>
      <input type='text' value={value} onChange={onChange} onBlur={onBlur}/>
      <div>{help}</div>
    </div>
  );
};


class RfsInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {grabRef, fieldState, handleValueChange, showValidationMessage, ...other} = this.props;

    if (grabRef) { grabRef(this); }

    return (
      <Input
        value={fieldState.getValue()}
        help={fieldState.getMessage()}
        onChange={e => handleValueChange(e.target.value)}
        onBlur={showValidationMessage}
        {...other}
        />
    );
  }
};


export default class TestForm extends Component {
  constructor(props) {
    super(props);
    this.formState = new FormState(this);
    this.state = this.formState.createUnitOfWork().injectModel(props.model);
    props.grabFormRef(this);
  }
  render() {
    return (
      <Form formState={this.formState} onSubmit={e => this.handleSubmit(e)}>
        <RfsInput
          formField='test'
          label='Test'
          required
          fsv={v => v.minLength(8)}
          grabRef={this.props.grabInputRef}
          />
        <input type='submit' value='Submit' disabled={this.formState.isInvalid()}/>
      </Form>
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    const model = this.formState.createUnitOfWork().createModel();
    if (model) {
      alert(JSON.stringify(model));
    }
  }
}
