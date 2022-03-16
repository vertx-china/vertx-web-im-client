import styled from "@emotion/styled";
import {
  Button,
  Collapse,
  Divider,
  MenuItem,
  MenuList,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { socket } from "../utils";
import { DataContext } from "./DataProvider";

const Container = styled.div`
  flex: 1;
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  .nickname {
    display: flex;
    align-items: center;
    padding-left: 5px;
    > * {
      margin-right: 5px;
    }
    height: 50px;
  }
  .collapse-controller {
    height: 24px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const UserList = () => {
  const { userList } = useContext(DataContext);

  const [nickname, setNickname] = useState("");

  const [isOpen, setOpen] = useState(true);

  const renderUserList = () => {
    return Array.isArray(userList)
      ? userList.map((item, index) => {
          return <MenuItem key={item + index}>{item}</MenuItem>;
        })
      : null;
  };


  useEffect(() => {
    const nickname = localStorage.getItem("nickname") || "guest-web";
    if (nickname) {
      socket.addEventListener("open", () => {
        socket.send(JSON.stringify({ nickname: nickname }));
        setNickname(nickname);
        localStorage.setItem("nickname", nickname);
      });
    }
  }, []);

  const handleClick = () => {
    socket.send(JSON.stringify({ nickname: nickname }));
    localStorage.setItem("nickname", nickname);
    setNickname(nickname);
  };

  return (
    <Container>
      <div className="nickname">
        <TextField
          size="small"
          style={{ flex: 3, fontSize: "12px" }}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Your name: guest-web"
        />
        <Button
          disabled={!nickname}
          size="small"
          style={{ flex: 1 }}
          onClick={handleClick}
        >
          modify
        </Button>
      </div>
      <Divider />
      <Collapse in={isOpen} style={{ maxHeight: "500px", overflow: "auto" }}>
        <MenuList>{renderUserList()}</MenuList>
      </Collapse>
      <Divider />
      <div onClick={() => setOpen(!isOpen)} className="collapse-controller">
        {isOpen ? "up" : "down"}
      </div>
    </Container>
  );
};

export default UserList;
