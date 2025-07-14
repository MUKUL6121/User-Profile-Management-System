import Nav from "./nav/nav";
import Form from "./form/form.jsx";
// import Form from './form/form2.jsx';

import './user.css'

export default function User() {
    return (
        <div id="container" className="container w-100 ">
            <header id="header" className="w-100 font-danger border border-3 rounded"><Nav name="My Company" /></header>
            <main
                style={{ color: "black" }} id="main"
                className="border border-3 rounded d-flex justify-content-between gap-3 p-5"
            >
                <Form
                    className="p-3 bg-light w-25"
                    style={{ minWidth: "50%", maxWidth: "100%" }}
                />
                
            </main>

        </div>
    )
};