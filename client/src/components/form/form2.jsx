import axios from 'axios';
import { useState } from 'react';

export default function Form() {
    const [action, setAction] = useState('Read');
    const [eid, setEid] = useState('');
    const [name, setName] = useState('');
    const [salary, setSalary] = useState('');
    const [preid, setpreid] = useState('');

    // Optional: define or remove this depending on use
    const checkselection = () => {
        console.log("Selection Checked:", action);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        checkselection();

        const data_set = { eid, name, sal: salary };
        console.log('Action:', action, 'Payload:', data_set);

        try {
            if (action === 'Create') {
                await axios.post('http://localhost:5000/user', data_set);
                alert('User created successfully!');
            } else if (action === 'Delete') {
                await axios.delete(`http://localhost:5000/user/${eid}`);
                alert('User deleted successfully!');
            } else if (action === 'Update') {
                await axios.patch(`http://localhost:5000/user/${preid}`, data_set);
                alert('User updated successfully!');
            } else {
                alert('Read action selected - no backend request made.');
            }

            // Clear all fields
            setEid('');
            setName('');
            setSalary('');
            setpreid('');

        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    // Visibility logic
    const showPreid = action === 'Update';
    const showEid = action !== 'Read';
    const showNameSalary = action === 'Create' || action === 'Update';

    return (
        <div className="border border-3 border-black rounded w-50 h-100 p-3">
            <form className="row g-4 needs-validation" noValidate onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-md-3">
                        <label htmlFor="actionSelect" className="form-label">
                            <h2>Select</h2>
                        </label>
                        <select
                            className="form-select"
                            id="actionSelect"
                            value={action}
                            onChange={(e) => setAction(e.target.value)}
                            required
                        >
                            <option value="Read">Read</option>
                            <option value="Create">Create</option>
                            <option value="Delete">Delete</option>
                            <option value="Update">Update</option>
                        </select>
                    </div>
                </div>

                {showPreid && (
                    <div className="col-md-4">
                        <label htmlFor="preid" className="form-label">Previous ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="preid"
                            value={preid}
                            onChange={(e) => setpreid(e.target.value)}
                            required
                        />
                    </div>
                )}

                {showEid && (
                    <div className="col-md-4">
                        <label htmlFor="eid" className="form-label">User ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="eid"
                            value={eid}
                            onChange={(e) => setEid(e.target.value)}
                            required
                        />
                    </div>
                )}

                {showNameSalary && (
                    <>
                        <div className="col-md-4">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="salary" className="form-label">Salary</label>
                            <input
                                type="number"
                                className="form-control"
                                id="salary"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                <div className="col-12">
                    <button className="btn btn-danger" type="submit" style={{ visibility: 'hidden', width: '50px' }}>
                        Submit form
                    </button>
                    <button className="btn btn-danger" type="submit">
                        Submit form
                    </button>
                    <button className="btn btn-danger" type="submit" style={{ visibility: 'hidden', width: '50px' }}>
                        Submit form
                    </button>
                </div>
            </form>
        </div>
    );
}
