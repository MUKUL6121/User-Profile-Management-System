import Dataset from '../data_table/dataset.jsx'
import { useEffect, useState } from 'react';
import Filter from './Filter.js'
import axios from 'axios'

export default function Form() {
    // const server_url = "https://user-profile-management-system.onrender.com";
    const server_url =" https://user-profile-management-system.onrender.com/";
    const [action, setaction] = useState('All');
    const [preid, setpreid] = useState('');
    const [eid, seteid] = useState('');
    const [name, setname] = useState('');
    const [salary, setsalary] = useState('');
    const [data, setdata] = useState([]);

    useEffect(() => {
        Filter();
        fetchAllUsers();
    }, []);

    async function fetchAllUsers() {
        try {
            const res = await axios.get(`${server_url}users`);
            
            setdata(res.data);
            setpreid('')
            seteid('')
            setname('')
            setsalary('')
        } catch (err) {
            console.log("Fetch error:", err);
        }
    }

    async function CURD() {
        try {
            if (action === "All") {
                await fetchAllUsers();
            }
            else if (action === "Find") {
                const res = await axios.get(`${server_url}user/${eid}`);
                setdata(res.data);
                // await fetchAllUsers();
            }
            else if (action === "Create") {
                const res = await axios.get(`${server_url}user`);
                const users = res.data;
                if (users.some(user => user.eid === eid)) {
                    alert("User already exists");
                } else {
                    seteid(res.data.length + 1)
                    await axios.post(`${server_url}/user`, { eid, name, sal: +salary });
                    await fetchAllUsers();
                }
            }
            else if (action === "Delete") {
                if (eid === '000') {
                    await axios.delete(`${server_url}user`);
                } else {
                    await axios.delete(`${server_url}user/${eid}`);
                }
                await fetchAllUsers();
            }
            else if (action === "Update") {
                await axios.patch(`${server_url}${preid}`, { eid, name, sal: +salary });
                await fetchAllUsers()
            }
        } catch (err) {
            console.log('Operation failed:', err);
        }
    }

    function handleAction(e) {
        e.preventDefault();
        Filter();
        CURD();
    }

    return (
        <div className='d-flex gap-3'>
            <div style={{ minWidth: '200px', maxWidth: '350px', maxheight: "350px" }}>
                <form onSubmit={handleAction} className=" gap-3 border border-3 border-black rounded p-2 justify-content-center align-items-center" style={{ minWidth: '200px', maxWidth: '350px', maxheight: "350px" }}>
                    <div className="row">
                        <div className="container col-md-10 text-center p-2">
                            <label htmlFor="actionSelect" className="form-label">
                                <h4>Select Action</h4>
                            </label>
                            <select className="form-select" id="actionSelect" onChange={(e) => {
                                const newAction = e.target.value;
                                setaction(newAction);
                                Filter();
                            }} required>
                                <option value="All">All Data</option>
                                <option value="Find">Find</option>
                                <option value="Create" >Create</option>
                                <option value="Delete">Delete</option>
                                <option value="Update">Update</option>
                            </select>
                        </div>
                    </div>

                    <div className="justify-content-center">
                        <div className="row p-2 justify-content-center">
                            <div id='input1' className="col-md-5">
                                <label htmlFor="preid" className="form-label fw-bold">Previous ID</label>
                                <input id="preid" name='preid' type="text" onChange={(e) => setpreid(e.target.value)} className="form-control border border-1 border-black" required />
                            </div>
                            <div id='input2' className="col-md-5">
                                <label htmlFor="eid" className="form-label fw-bolder">E_ID</label>
                                <input id="eid" name="eid" type="text" value={eid} onChange={(e) => seteid(e.target.value)} className="form-control border border-1 border-black" required />
                            </div>
                        </div>
                        <div className="row mb-3 justify-content-center">
                            <div id="input3" className="col-md-5">
                                <label htmlFor="name" className="form-label fw-bolder">Name</label>
                                <input id="name" name='name' type="text" value={name} onChange={(e) => setname(e.target.value)} className="form-control border border-1 border-black" required />
                            </div>
                            <div id="input4" className="col-md-5">
                                <label htmlFor="salary" className="form-label fw-bolder">Salary</label>
                                <input id="salary" name="salary" type="text" value={salary} onChange={(e) => setsalary(e.target.value)} className="form-control border border-1 border-black" required />
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-danger m-2" type='submit'>Submit</button>
                </form>
            </div>

            <div>
                <Dataset className="p-3 bg-light w-25" style={{ minWidth: "50%", maxWidth: "100%" }} data={data} />
            </div>
        </div>
    );
}
