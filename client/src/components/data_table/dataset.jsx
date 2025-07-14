// import axios from 'axios';
import './dataset.css';
import React, { useState, useEffect } from 'react';

export default function Dataset(props) {
    // var a = props.data;
    // console.log(a)
    const [loading, setLoading] = useState("");
    const [data2, setData2] = useState([]);  // Initialize as empty array, NOT empty string

   useEffect(() => {
    const users = props.data;
    const border = '1px solid grey';
    let tableRows = [];

    if (Array.isArray(users) && users.length > 0) {
        tableRows = users.map((user, index) => (
            <tr key={index} style={{ border }}>
                <td style={{ border }}>{index + 1}</td>
                <td style={{ border }}>{user.eid}</td>
                <td style={{ border }}>{user.name}</td>
                <td style={{ border }}>{user.sal}</td>
            </tr>
        ));

        setTimeout(() => {
            setLoading("Employee Detail's");
            setData2(tableRows);
        }, 1000);
    }
    //  else {
    //     setLoading("No Data Found");
    //     setData2([]);  // Show empty table body
    // }
}, [props.data]);  // ✅ Now runs only when props.data changes


    return (
        <div className="border border-3 border-black rounded p-3">
            <h3>{loading}</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Sr.no.</th>
                            <th>E_id</th>
                            <th>Names</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data2}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
