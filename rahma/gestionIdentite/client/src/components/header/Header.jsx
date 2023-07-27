import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const Component = styled(AppBar)`
  background-color: #f5f5f5;
  color: black;
  padding: 6px;
`;

const Container = styled(Toolbar)`
  justify-content: center;

  & > a {
    margin: 0 20px;
    color: #000;
    text-decoration: none;
    font-size: 18px;

    transition: all 0.2s ease-in-out;

    &:hover {
      color: #00b0ff; /* Change to your desired hover color */
    }
  }
`;

const LogoutButton = styled(Button)`
  background-color: #00b0ff; /* Change to your desired button background color */
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  margin-left: 20px;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: grey; /* Change to your desired button hover background color */
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const logout = async () => navigate('/account');

  return (
    <Component>
      <Container>
        <Link to='/'>HOME</Link>
        <Link to='/about'>ABOUT</Link>
        <Link to='/contact'>CONTACT</Link>
        <LogoutButton onClick={logout}>LOGOUT</LogoutButton>
      </Container>
    </Component>
  );
};

export default Header;

