import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import StudentService from "../../services/student.service";
import { required, validEmail, vname } from "../../helpers/fieldValidators";

const avatra = "/avatar_2x.png";

const StudentAE = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [id, setID] = useState(0);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("JK");
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

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      if (id === 0) {
        StudentService.create(first_name, last_name, email, grade).then(res => {
          setMessage(res);
          setSuccessful(true);
        }).catch(err => {
          setMessage(err);
          setSuccessful(false);
        })
      }
      else {
        StudentService.update(id, first_name, last_name, email, grade).then(res => {
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
    StudentService.getById(id).then(res => {
      setID(res.data.id);
      setEmail(res.data.email);
      setFirstName(res.data.first_name);
      setLastName(res.data.last_name);
      setGrade(res.data.grade);
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
              <h2 className="card-heading">Student Details</h2>
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="first_name"
                  value={first_name}
                  onChange={onChangeFirstName}
                  validations={[required, vname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="last_name"
                  value={last_name}
                  onChange={onChangeLastName}
                  validations={[required, vname]}
                />
              </div>

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
                <label htmlFor="grade">Grade</label>
                <select className="form-control" value={grade} onChange={onChangeGrade}>
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

              <div className="form-group">
                <button className="btn btn-primary btn-block">Save User</button>
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
        <p style={{ fontSize: '12px' }}><Link to={"/students"} >
          Back to List View
        </Link>
        </p>
      </div>
    </div>
  );
};

export default StudentAE;
