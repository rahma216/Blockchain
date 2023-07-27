import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled, Box, Button, InputBase, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Container = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '50px 20px', // Add padding for spacing from header and footer
}));

const CardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 700,
  padding: 20,
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f5f5f5',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column', // Ensure card content is centered vertically
}));

const FormContent = styled(CardContent)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

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
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: 'auto',
}));

const CreateAssetForm = () => {
  const [ID, setID] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [createddate, setCreatedDate] = useState('');
  const navigate = useNavigate();

  // Function to generate a random 7-character ID
  const generateRandomID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  useEffect(() => {
    // Generate the random ID when the component mounts
    setID(generateRandomID());
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/api/assets', {
        ID,
        username,
        name,
        password,
        email,
        role,
        createddate: new Date(createddate).toISOString(), // Convert the date to ISO format
      });

      // Handle the response from the backend (success or error)
      console.log('Response data:', response.data);
    console.log('Form submission successful.');
    navigate('/'); 
    } catch (error) {
      console.error('Error creating asset:', error);
    }
  };

  const BlueHeading = styled('h5')({
    color: 'grey', // Set the color to blue
  });

  return (
    <Container>
      <br /> <br /><br /><br /> <br /> <br /><br /><br />
      <CardContainer>
        <FormContent>
          <BlueHeading>User Registration</BlueHeading>
          <form onSubmit={handleSubmit}>
            <br />
            <ImageContainer>
              <Image
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                alt='Sample photo'
              />
            </ImageContainer>
          <br />
            <InputTextField
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputTextField
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputTextField
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputTextField
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputTextField
              type='text'
              placeholder='Role'
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          
            <InputTextField
              type='date'
              placeholder='Created Date'
              value={createddate}
              onChange={(e) => setCreatedDate(e.target.value)} // Update the createddate state
            />
            <br /><br />
            <SubmitButton type='submit' variant='contained' color='primary'>
              Create User
            </SubmitButton>
          </form>
        </FormContent>
      </CardContainer>
    </Container>
  );
};

export default CreateAssetForm;
