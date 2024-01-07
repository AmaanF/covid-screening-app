import React, { useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import FormService from "../../services/form.service";
import { required, validEmail, vname } from "../../helpers/fieldValidators";


const FormAE = (props) => {

  const form = useRef();
  const checkBtn = useRef();

  const [disable, setDisable] = useState(false);

  const [id, setID] = useState(0);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("JK");

  const [question_1, setQuestion1] = useState(0);
  const [question_2, setQuestion2] = useState(0);
  const [question_3, setQuestion3] = useState(0);
  const [question_4, setQuestion4] = useState(0);
  const [question_5, setQuestion5] = useState(0);
  const [question_6, setQuestion6] = useState(0);

  const [symptom_1, setSymptom1] = useState(false);
  const [symptom_2, setSymptom2] = useState(false);
  const [symptom_3, setSymptom3] = useState(false);
  const [symptom_4, setSymptom4] = useState(false);
  const [symptom_5, setSymptom5] = useState(false);

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const onChangeFirstName = (e) => {
    const name = e.target.value;
    setFirstName(name);
  };

  const onChangeLastName = (e) => {
    const name = e.target.value;
    setLastName(name);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangeGrade = (e) => {
    const grade = e.target.value;
    setGrade(grade);
  };

  const onChangeQ1 = (e) => {
    const b = +e.target.value;
    setQuestion1(b);
  };

  const onChangeQ2 = (e) => {
    const b = +e.target.value;
    setQuestion2(b);
  };
  const onChangeQ3 = (e) => {
    const b = +e.target.value;
    setQuestion3(b);
  };
  const onChangeQ4 = (e) => {
    const b = +e.target.value;
    setQuestion4(b);
  };
  const onChangeQ5 = (e) => {
    const b = +e.target.value;
    setQuestion5(b);
  };
  const onChangeQ6 = (e) => {
    const b = +e.target.value;
    setQuestion6(b);
  };

  const onChangeSP1 = (e) => {
    const b = e.target.checked;
    setSymptom1(b);
  };

  const onChangeSP2 = (e) => {
    const b = e.target.checked;
    setSymptom2(b);
  };

  const onChangeSP3 = (e) => {
    const b = e.target.checked;
    setSymptom3(b);
  };

  const onChangeSP4 = (e) => {
    const b = e.target.checked;
    setSymptom4(b);
  };

  const onChangeSP5 = (e) => {
    const b = e.target.checked;
    setSymptom5(b);
  };


  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      if (id === 0) {
        let formData = {
          first_name,
          last_name,
          email,
          grade,
          question_1,
          question_2,
          question_3,
          question_4,
          question_5,
          question_6,
          symptom_1,
          symptom_2,
          symptom_3,
          symptom_4,
          symptom_5,
        }
        FormService.create(formData).then(res => {
          setMessage(res.data);
          setSuccessful(true);
        }).catch(err => {
          setMessage("Invalid User Details");
          setSuccessful(false);
        })
      }
    }
  };

  const fetchData = (id) => {
    if (id) {
      FormService.getById(id).then(res => {
        if (res.data) {
          setDisable(true);
          setID(res.data.id);
          setQuestion1(res.data.question_1);
          setQuestion2(res.data.question_2);
          setQuestion3(res.data.question_3);
          setQuestion4(res.data.question_4);
          setQuestion5(res.data.question_5);
          setQuestion6(res.data.question_6);

          setSymptom1(res.data.symptom_1);
          setSymptom2(res.data.symptom_2);
          setSymptom3(res.data.symptom_3);
          setSymptom4(res.data.symptom_4);
          setSymptom5(res.data.symptom_5);

        }
      })
    }
  }
  useEffect(() => {
    fetchData(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {

  }, []);

  return (
    <div className="col-md-12">
      <Form onSubmit={handleRegister} ref={form}>
        {!successful && (
          <div className="row">
            <div className="col-md-12">
              <h2 className="card-heading">Screening Form</h2>
            </div>
            {id === 0 && (
              <>
                <div className="col-md-3 form-group">
                  <label htmlFor="first_name">First Name</label>
                  <Input
                    type="text"
                    className="form-control form-control-sm"
                    name="first_name"
                    value={first_name}
                    onChange={onChangeFirstName}
                    validations={[required, vname]}
                  />
                </div>

                <div className="col-md-3 form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <Input
                    type="text"
                    className="form-control form-control-sm"
                    name="last_name"
                    value={last_name}
                    onChange={onChangeLastName}
                    validations={[required, vname]}
                  />
                </div>

                <div className="col-md-3 form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control form-control-sm"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div>

                <div className="col-md-3 form-group">
                  <label htmlFor="grade">Grade</label>
                  <select className="form-control form-control-sm" value={grade} onChange={onChangeGrade}>
                    <option value="JK">JK</option>
                    <option value="SK">SK</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4G">4G</option>
                    <option value="4B">4B</option>
                    <option value="5G">5G</option>
                    <option value="5B">5B</option>
                    <option value="6G">6G</option>
                    <option value="6B">6B</option>
                    <option value="7G">7G</option>
                    <option value="7B">7B</option>
                    <option value="8G">8G</option>
                    <option value="8B">8B</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>
              </>)}

            <div className="col-md-12">
              <div className="row">
                <div className="col-md-10"><b> Questions</b></div>
                <div className="col-md-2"><b>Yes/No</b></div>
              </div>


              <div className="row">
                <div className="col-md-10">
                  <label htmlFor="question_1"> In the last 14 days, have you travelled outside of Canada and been told to quarantine (per the federal quarantine requirements)?</label>
                </div>
                <div className="col-md-2 form-group">
                  <input disabled={disable} type="radio" value="1" name="question_1" className="inline-radio" onChange={onChangeQ1} checked={question_1 === 1} /> Yes
                  <input disabled={disable} type="radio" value="0" name="question_1" className="inline-radio" onChange={onChangeQ1} checked={question_1 === 0} /> No
                </div>
              </div>

              <div className="row">
                <div className="col-md-10">
                  <label htmlFor="question_2">Has a doctor, health care provider, or public health unit told you that you should currently be isolating (staying at home)?</label>
                </div>
                <div className="col-md-2 form-group">
                  <input disabled={disable} type="radio" value="1" name="question_2" className="inline-radio" onChange={onChangeQ2} checked={question_2 === 1} /> Yes
                  <input disabled={disable} type="radio" value="0" name="question_2" className="inline-radio" onChange={onChangeQ2} checked={question_2 === 0} /> No
                </div>
              </div>

              <div className="row">
                <div className="col-md-10">
                  <label htmlFor="question_3">In the last 10 days, have you been identified as a "close contact" of someone who currently has COVID-19? </label>
                </div>
                <div className="col-md-2 form-group">
                  <input disabled={disable} type="radio" value="1" name="question_3" className="inline-radio" onChange={onChangeQ3} checked={question_3 === 1} /> Yes
                  <input disabled={disable} type="radio" value="0" name="question_3" className="inline-radio" onChange={onChangeQ3} checked={question_3 === 0} /> No
                </div>
              </div>

              <div className="row">
                <div className="col-md-10">
                  <label htmlFor="question_4">In the last 10 days, have you received a COVID Alert exposure notification on your cell phone?</label>
                </div>
                <div className="col-md-2 form-group">
                  <input disabled={disable} type="radio" value="1" name="question_4" className="inline-radio" onChange={onChangeQ4} checked={question_4 === 1} /> Yes
                  <input disabled={disable} type="radio" value="0" name="question_4" className="inline-radio" onChange={onChangeQ4} checked={question_4 === 0} /> No
                </div>
              </div>

              <div className="row">
                <div className="col-md-10">
                  <label htmlFor="question_5">Is anyone you live with currently experiencing any new COVID-19 symptoms and/or waiting for test results after experiencing symptoms?</label>
                </div>
                <div className="col-md-2 form-group">
                  <input disabled={disable} type="radio" value="1" name="question_5" className="inline-radio" onChange={onChangeQ5} checked={question_5 === 1} /> Yes
                  <input disabled={disable} type="radio" value="0" name="question_5" className="inline-radio" onChange={onChangeQ5} checked={question_5 === 0} /> No
                </div>
              </div>

              <div className="row">
                <div className="col-md-10">
                  <label htmlFor="question_6">In the last 10 days, have you tested positive on a rapid antigen test or home-based self-testing kit?</label>
                </div>
                <div className="col-md-2 form-group">
                  <input disabled={disable} type="radio" value="1" name="question_6" className="inline-radio" onChange={onChangeQ6} checked={question_6 === 1} /> Yes
                  <input disabled={disable} type="radio" value="0" name="question_6" className="inline-radio" onChange={onChangeQ6} checked={question_6 === 0} /> No
                </div>
              </div>
              <div className="row">
                <b>Check off if you or ANY member of your household has any of the following symptoms:</b>
              </div>
              <div className="row">
                <div className="col-md-1 form-group">
                  <Input disabled={disable} type="checkbox" checked={symptom_1} value={symptom_1} name="symptom_1" className="form-control  form-control-sm"
                    onChange={onChangeSP1} />
                </div>
                <div className="col-md-11">
                  <label htmlFor="symptom_1">Fever and/or chills (Temperature of 37.8 degrees Celsius or higher)</label>
                </div>
              </div>

              <div className="row">
                <div className="col-md-1 form-group">
                  <Input disabled={disable} type="checkbox" checked={symptom_2} value={symptom_2} name="symptom_2" className="form-control  form-control-sm"
                    onChange={onChangeSP2} />
                </div>
                <div className="col-md-11">
                  <label htmlFor="symptom_1">Cough</label>
                </div>
              </div>

              <div className="row">
                <div className="col-md-1 form-group">
                  <Input disabled={disable} type="checkbox" checked={symptom_3} value={symptom_3} name="symptom_3" className="form-control form-control-sm"
                    onChange={onChangeSP3} />
                </div>
                <div className="col-md-11">
                  <label htmlFor="symptom_3">Shortness of breath</label>
                </div>
              </div>

              <div className="row">
                <div className="col-md-1 form-group">
                  <Input disabled={disable} type="checkbox" checked={symptom_4} value={symptom_4} name="symptom_4" className="form-control  form-control-sm"
                    onChange={onChangeSP4} />
                </div>
                <div className="col-md-11">
                  <label htmlFor="symptom_4">Decrease or loss of taste or smell</label>
                </div>
              </div>

              <div className="row">
                <div className="col-md-1 form-group">
                  <Input disabled={disable} type="checkbox" checked={symptom_5} value={symptom_5} name="symptom_5" className="form-control  form-control-sm"
                    onChange={onChangeSP5} />
                </div>
                <div className="col-md-11">
                  <label htmlFor="symptom_5">Nausea, vomiting, and/or diarrhea</label>
                </div>
              </div>

            </div>

            {id === 0 && (<div className="col-md-12 form-group">
              <button className="btn btn-primary">Save Form</button>
            </div>)}
          </div>
        )}

        {message && (
          <div className="form-group">
            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
};

export default FormAE;
