import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Field, reduxForm } from "redux-form";
import { TextField } from "@material-ui/core";
//import asyncValidate from './asyncValidate'; maybe?


/* Styles */

const useStyles = makeStyles(() => ({
  searchBar: {
    color: "white",
    padding: "0.5rem",
  },
}));


/*Constants */

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}:{input:any,label:any, meta: {touched:any, error:any}}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const MaterialUiForm = (props: any) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.searchBar} color="primary">
      <div>
        <Field
          name="searchTerm"
          component={renderTextField}
          label="Search Term"
        />
      </div>     

      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "MaterialUiForm", // a unique identifier for this form
})(MaterialUiForm);
