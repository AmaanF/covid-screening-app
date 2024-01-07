import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import StudentService from "../../services/student.service";

const tick = "/green.png";
const cross = "/red.png";
const graycross = "/graycross.jpg";
const StudentLV = (props) => {
    const [search, setSearch] = useState("");
    const [students, setStudents] = useState([]);
    const [isSuccessfull, setSuccessfull] = useState(true);

    const loadData = () => {
        StudentService.getAll().then(
            (response) => {
                setStudents(response.data);
            },
            (error) => {
                setSuccessfull(false);
            }
        );
    }

    useEffect(() => {
        loadData();
    }, []);

    function imageaSwitch(e) {
        if (e === null) {
            return graycross;
        } else if (e === 1) {
            return tick;
        } else {
            return cross;
        }
    };

    const onChangeSearch = (e) => {
        const searchText = e.target.value;
        if (searchText !== "") {
            var searchResult = students.filter(x => x.first_name.toLowerCase().includes(searchText.toLowerCase()));
            setStudents(searchResult);
        }
    };


    function handleDelete(id, event) {
        event.preventDefault();
        console.log(id);
        StudentService.deleteById(id).then(res => {
            if (res.status === 200) {
                loadData();
                alert(res.data);
            }
        });
    };

    return (
        <div className="col-md-12">
            <h2 className="center-heading">Students</h2>
            {isSuccessfull == false && (
                <div className="alert alert-danger" role="alert">
                    Error while loading data
                </div>
            )}
            <div className="row mb-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        name="search"
                        onBlur={onChangeSearch}
                    />
                </div>
                <div className="col-md-4">
                    <button type="button" className="btn btn-primary btn-sm" onClick={loadData}>Reload</button>
                </div>
                <div className="col-md-2">
                    <Link to={`/students/add`} ><button type="button" className="btn btn-primary btn-sm">Add New</button></Link>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">FirstName</th>
                        <th scope="col">LastName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Safe</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((item, index) => (
                        <tr key={index}>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>
                            <td>{item.grade}</td>
                            <td><img className="safe-icon" src={imageaSwitch(item.safe)} /></td>
                            <td><Link to={`/students/details/${item.id}`} >View</Link> | <Link to={`/students/edit/${item.id}`} >Edit</Link> | <button key={index} type="button" className="btn btn-danger btn-sm inline-radio" onClick={(e) => handleDelete(item.id, e)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentLV;
