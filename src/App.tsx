import { once } from "lodash";
import { useContext, useEffect, useMemo } from "react";
import "./App.css";
import { DataContext, DispatchContext } from "./components/DataProvider";
// import {  useData, useDispatch } from "./components/DataProvider";
import MessageList from "./components/MessageList";
import MSGEditor from "./components/MSGEditor";
import { socket } from "./utils";

function App() {
  // const dispatch = useDispatch();
  const dispatch = useContext(DispatchContext);
  const { clientID } = useContext(DataContext);
  const getClientID = useMemo(
    () =>
      once((data: VC.MSGStruct) => {
        const keys = Object.keys(data);
        console.log(data, keys[0]);
        if (keys.length === 1 && keys[0] === "id") {
          dispatch({
            type: "setClientType",
            payload: data.id,
          });
        }
      }),
    [dispatch]
  );

  useEffect(() => {
    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if ("nicknames" in data) {
        dispatch({
          type: "setUserList",
          payload: data,
        });
      } else {
        if (!clientID) {
          return;
        }
        dispatch({
          type: "setMSGData",
          payload: data,
        });
      }
    });
  }, [clientID, dispatch]);

  useEffect(() => {
    socket.addEventListener("open", () => {
      socket.send(JSON.stringify({ nickname: "get user list" }));
    });

    // Listen for messages
    socket.addEventListener("message", function (event) {
      try {
        const data = JSON.parse(event.data);
        getClientID(data);
      } catch (error) {
        console.log(error);
      }
    });
  }, []); //eslint-disable-line

  return (
    <div className="App">
      <div className="msg-container">
        <MessageList />
        <MSGEditor />
      </div>
    </div>
  );
}

export default App;
