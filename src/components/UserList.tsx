import styled from "@emotion/styled";
import { useContext } from "react";
import { DataContext } from "./DataProvider";

const Container = styled.div`
  flex: 1;
`;

const UserList = () => {
  const { userList } = useContext(DataContext);

  const renderUserList = () => {
    return userList.map((item) => {
      return <div>{item}</div>;
    });
  };

  return (
    <Container>
      <div></div>
      <div>{renderUserList()}</div>
    </Container>
  );
};

export default UserList;