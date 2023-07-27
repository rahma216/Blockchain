import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled, Box, Button, InputBase, Card, CardContent, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    margin: 0
  }
}));

const CardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 700,
  margin: '0 auto',
  padding: 20,
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f5f5f5',
  textAlign: 'center',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' }, // Arrange the card content in a row for larger screens
}));

const FormContent = styled(CardContent)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '50%', // Set a minimum width for the image container
}));

const Image = styled('img')({
  width: '50%', // Set width to 100% to fill the available space
  height: '50%', // Set height to 100% to fill the available space
  objectFit: 'cover',
  opacity: 0.8,
});

const InputTextField = styled(InputBase)(({ theme }) => ({
  flex: 1,
  margin: '10px ',
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  outline: 'none',
  alignItems: 'center',
  '&:focus': {
    border: `1px solid ${theme.palette.primary.main}`,
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    marginTop: 'auto',
}));

const UpdateAsset = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    username: '',
    name: '',
    password: '',
    email: '',
    role: '',
    createddate: ''
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/assets/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user identity:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateAsset = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      console.log('Updating user identity with ID:', id);
      await axios.put(`http://localhost:3002/api/assets/${id}`, user);
      console.log('User identity updated successfully!');
      navigate(`/detail/${id}`);
    } catch (error) {
      console.error('Error updating user identity:', error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const BlueHeading = styled('h5')({
    color: 'grey', // Set the color to blue
  });

  return (
    <Container>
      <br /> <br /><br /><br />
      <CardContainer>
        <FormContent>
          <BlueHeading>Update User</BlueHeading>
          <br />
          <form onSubmit={updateAsset}>
            <br />
            <ImageContainer>
              <Image
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                alt="Sample photo"
              />
            </ImageContainer>
            <br />
            <InputTextField
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Username"
            />
            <InputTextField
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <InputTextField
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <InputTextField
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <InputTextField
              name="role"
              value={user.role}
              onChange={handleChange}
              placeholder="Role"
            />
         
            <InputTextField
              name="createddate"
              type="date"
              value={user.createddate}
              onChange={handleChange}
              placeholder="Created Date"
            />
            <br /><br />
            <SubmitButton type="submit" variant="contained" color="primary">
             Update User
            </SubmitButton>
          </form>
        </FormContent>
      </CardContainer>
    </Container>
  );
};

export default UpdateAsset;


