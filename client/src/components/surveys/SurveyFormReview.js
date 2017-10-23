import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = () =>
    formFields.map(({ label, name }) => (
      <div key={label}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    ));
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>{reviewFields()}</div>
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green white-text btn-flat right"
      >
        Send Survey <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  formValues: state.form.surveyForm.values
});

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
