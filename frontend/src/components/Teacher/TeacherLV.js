import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import TeacherService from "../../services/teacher.service";

const TeacherLV = () => {
    const [teachers, setTeachers] = useState([]);
    const [isSuccessfull, setSuccessfull] = useState(true);

    useEffect(() => {
        TeacherService.getAll().then(
            (response) => {
                setTeachers(response.data);
            },
            (error) => {
                setSuccessfull(false);
            }
        );
    }, []);


    return (
        <div className="col-md-12">
            <h2 className="center-heading">Teachers</h2>
            {isSuccessfull == false && (
                <div className="alert alert-danger" role="alert">
                    Error while loading data
                </div>
            )}
            <div className="row">
                <div className="col-md-10">

                </div>
                <div className="col-md-2">
                    <Link to={`/teachers/add`} ><button type="button" className="btn btn-primary">Add New</button></Link>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Email</th>
                        <th scope="col">password</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((item, index) => (
                        <tr key={index}>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td><Link to={`/teachers/edit/${item.id}`} >Edit</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherLV;
