import { Container } from "react-bootstrap";

const Dashboard = ({ user }) => {
  return (
    <Container>
      <h1 className="mt-3">Welcome, {user.username}</h1>
      <p>
        This is a website to manage your inventory. You can add, edit and remove mateirals. As well as view change history!
      </p>
    </Container>
  );
};

export default Dashboard;