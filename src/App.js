import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import ChatRoom from './js/ChatRoom';
import LoginPage from './js/LoginPage';

function App() {
  let history = useHistory();
  const [userName, setUserName] = useState("user");
  const [roomId, setRoomId] = useState("");
  // const [joinRoom, setJoinRoom] = useState(false);
  const [msg, setMsg] = useState("");
  // const [convo, setConvo] = useState([]);
  const [dataRoom, setDataRoom] = useState([{
    roomid: 0,
    conversation: []
  }]);
  const [roomIndex, setRoomIndex] = useState(0);

  function getData() {
    axios.get('http://localhost:4000/rooms')
      .then(res => setDataRoom(res.data));
  }

  useEffect(() => {
    getData()
  }, [dataRoom])


  function handleUsername(e) {
    setUserName(e.target.value);
  }

  function handleRoomId(e) {
    setRoomId(e.target.value);
  }

  function handleJoin() {
    var roomIndex = dataRoom.findIndex(e => e.roomid === roomId)
    // console.log(roomIndex)
    const newRoom = {
      roomid: roomId,
      conversation: []
    };

    if (roomIndex !== null && roomIndex !== undefined && roomIndex !== -1) {
      setRoomIndex(roomIndex);
      // setJoinRoom(!joinRoom);
    } else {
      //create new room
      const lastIndex = dataRoom.length + 1;
      axios.post('http://localhost:4000/rooms/create-room', newRoom)
        .then(res => console.log(res.data));
      setRoomIndex(lastIndex);
      // setJoinRoom(!joinRoom);
      // console.log(lastIndex)
    }
    
    history.push("/room/"+roomId);
    // console.log(dataRoom[roomIndex].conversation)
  }

  function handleMessage(e) {
    setMsg(e.target.value);
  }

  function submitMsg(e) {
    e.preventDefault();
    const newConvo = dataRoom[roomIndex].conversation.slice();
    const newMsg = {
      index: dataRoom[roomIndex].conversation.length+1,
      username: userName,
      text: msg      
    }
    newConvo.push(newMsg);
    
    const updateRoom = {
      _id: dataRoom[roomIndex]._id,
      roomid: dataRoom[roomIndex].roomid,
      conversation: newConvo,
    }

    if (msg.length !== 0 ) {
      axios.put('http://localhost:4000/rooms/update-room', updateRoom)
    .then(res => console.log(res.data));
    
    axios.get('http://localhost:4000/rooms')
    .then(res => setDataRoom(res.data));

    setMsg("");
    }
  }

  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route path="/login">
        <LoginPage
          handleUsername={handleUsername}
          handleRoomId={handleRoomId}
          handleJoin={handleJoin}
        />
      </Route>
      <Route path="/room/:roomId">
        <ChatRoom
         roomId={roomId}
         user={userName}
         handleMessage={handleMessage}
         submitMsg={submitMsg}
         value={msg}
         conversation={dataRoom[roomIndex].conversation}
      />
      </Route>
    </Switch>   
  );
}

export default App;
