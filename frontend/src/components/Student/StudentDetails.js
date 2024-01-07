import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom';
import StudentService from "../../services/student.service";

const tick = "/green.png";
const cross = "/red.png";
const graycross = "/graycross.jpg";

const StudentDetails = (props) => {
    const [student, setStudent] = useState({});

    const fetchData = (id) => {
        StudentService.getWithDetailsById(id).then(res => {
            if (res.data) {
                setStudent(res.data);
            }
        })
    }

    function imageaSwitch(e) {
        if (e === null) {
            return graycross;
        } else if (e === 1) {
            return tick;
        } else {
            return cross;
        }
    };

    useEffect(() => {
        fetchData(props.match.params.id);
    }, [props.match.params.id]);


    return (
        <div className="col-md-12">

            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-6">
                        <div className="well well-sm">
                            <div className="row">
                                <div className="col-sm-6 col-md-8">
                                    <h4>
                                        {student.first_name}, {student.last_name}</h4>
                                    <small>Grade: <cite title="Grade">{student.grade}</cite></small>
                                    <p>{student.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            {student.forms && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Safe</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {student.forms.map((item, index) => (
                            <tr key={index}>
                                <td><Link to={`/covid-form/${item.id}`} >
                                    {(new Date(item.created_at)).toLocaleDateString("en-US")}
                                </Link></td>
                                <td><img className="safe-icon" src={imageaSwitch(item.safe)} /></td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StudentDetails;
