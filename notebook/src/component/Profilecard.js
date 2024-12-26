import React from 'react'


const Profilecard = (props) => {
    return (
        <div>
            <div className="card" style={{width: '18rem'}}>
                <div className="card-body">
                    <h5 className="card-title">{props.username}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.name}</h6>
                    <button className="btn btn-primary" onClick={() => {
                        localStorage.removeItem('token')
                        window.location.reload()
                    }}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Profilecard