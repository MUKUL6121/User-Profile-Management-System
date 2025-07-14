export default function Nav(props) {
    return (
        <>
            <div className="w-100 d-flex align-items-center justify-content-center" style={{ textAlign: 'center', backgroundColor: "black", height: '60px', width: '1240px' }}>
                <h2 style={{ color: "white" }}>{props.name}</h2>
            </div>
        </>
    )
}