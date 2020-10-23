import React from "react";
import { Field, reduxForm } from "redux-form";

const StreamForm = props => {
  const renderForm = () => {
    const onSubmit = formValues => {
      props.onSubmit(formValues);
    };

    return (
      <form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
        <Field name="title" component={renderInput} label="Enter Title" />
        <Field
          name="description"
          component={renderInput}
          label="Enter Description"
        />
        <button className="ui primary button">Submit</button>
      </form>
    );
  };

  return <div>{renderForm()}</div>;
};

const renderInput = ({ input, label, meta }) => {
  const errorMessage = () => {
    if (meta.error && meta.touched) {
      return (
        <div className="ui error message">
          <div className="header">{meta.error}</div>
        </div>
      );
    }
  };

  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} autoComplete="off" />
      {errorMessage()}
    </div>
  );
};

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a Title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a Description";
  }

  return errors;
};

export default reduxForm({
  form: "streamform",
  validate: validate
})(StreamForm);
