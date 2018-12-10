import React from 'react';

const Kudos = (props) => (
    <div key={props.id} className="kudos">
        
        <div className="titleKudo">{props.title}</div>
        {props.body}
    </div>
)


export default Kudos