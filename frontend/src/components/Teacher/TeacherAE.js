import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import TeacherService from "../../services/teacher.service";
import { required, validEmail, vpassword } from "../../helpers/fieldValidators";

const avatra = "/avatar_2x.png";

const TeacherAE = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [id, setID] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      if (id === 0) {
        TeacherService.create(email, password).then(res => {
          setMessage(res);
          setSuccessful(true);
        }).catch(err => {
          setMessage(err);
          setSuccessful(false);
        })
      }
      else {
        TeacherService.update(id, email, password).then(res => {
          setMessage(res);
          setSuccessful(true);
        }).catch(err => {
          setMessage(err);
          setSuccessful(false);
        })
      }
    }
  };

  const fetchData = (id) => {
    TeacherService.getById(id).then(res => {
      setID(res.data.id);
      setEmail(res.data.email);
      setPassword(res.data.password);
    })
  }
  useEffect(() => {
    fetchData(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {

  }, []);

  return (
    <div className="col-md-12">
      <div className="card card-container">

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <img
                src={avatra}
                alt="profile-img"
                className="profile-img-card"
              />
              <h2 className="card-heading">Teacher Details</h2>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Save</button>
              </div>
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
        <p style={{ fontSize: '12px' }}><Link to={"/teachers"} >
          Back to List View
        </Link>
        </p>
      </div>
    </div>
  );
};

export default TeacherAE;
