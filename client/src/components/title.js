import React from 'react';
import './kudos.css'

const Title = (props) => (
    <div key={props.id} className="title">
        <div className="to">To: {props.to}</div> 
        <div className="from">From: {props.from}</div>
        
    </div>
)

export default Title