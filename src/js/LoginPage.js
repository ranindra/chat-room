// import { useState } from 'react';

//styling
import './Style.scss';

function LoginPage(props) {   

    return (
        <div className="login">
            <h3 id="header">Join Chatroom</h3>
            <input id="input-form" placeholder="Username" onChange={props.handleUsername}/>
            <input id="input-form" placeholder="RoomID" onChange={props.handleRoomId}/>
            <button id="button-form" onClick={props.handleJoin}>JOIN</button>
        </div>
    )
}
export default LoginPage;