import React, { useState, useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Delete, Edit } from '@mui/icons-material';

const Container = styled(Box)(({ theme }) => ({
  margin: '150px auto', // Adjust the top margin as needed
  maxWidth: '600px',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
}));

const EditIcon = styled(Edit)`
  margin: 10px;
  padding: 10px;
  border: 1px solid #878787;
  border-radius: 10px;
  cursor: pointer;
  color: #3f51b5;
  font-size: 30px;
`;

const DeleteIcon = styled(Delete)`
  margin: 10px;
  padding: 10px;
  border: 1px solid #878787;
  border-radius: 10px;
  cursor: pointer;
  color: #f44336;
  font-size: 30px;
`;

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
  color: #333;
`;

const Subtitle = styled(Typography)`
  font-size: 18px;
  color: #666;
  margin-bottom: 10px;
`;

const Image = styled('img')`
  width: 200px;
  height: auto;
  display: block;
  margin: 20px auto;
`;

const Detail = () => {
  const [asset, setAsset] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/assets/${id}`);
        setAsset(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching asset:', error);
        setIsLoading(false);
      }
    };

    fetchAsset();
  }, [id]);

  const deleteAsset = async () => {
    try {
      console.log('Deleting asset with ID:', id);
      await axios.delete(`http://localhost:3002/api/assets/${id}`);
      console.log('Asset deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting asset:', error);
      console.log('error:', id);
    }
  };
  const BlueHeading = styled('h5')({
    color: 'grey', // Set the color to blue
  });
  const imageUrl = 'https://img.icons8.com/?size=512&id=n81E0rhVBhG2&format=png';

  return (
  
    <Container>
      <br />
      {isLoading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <>
         <BlueHeading>              User Details</BlueHeading>

          <Image src={imageUrl} alt="User" />

          <Subtitle>ID :  {asset.ID}</Subtitle>
          <Subtitle>Username :  {asset.username}</Subtitle>
          <Subtitle>Name :  {asset.name}</Subtitle>
          <Subtitle>Email :  {asset.email}</Subtitle>
          <Subtitle>Role :  {asset.role}</Subtitle>
          <Subtitle>Created Date :  {asset.createddate}</Subtitle>

          <Box display="flex" justifyContent="center" marginTop="20px">
        <Link to={`/updateAsset/${asset.ID}`}>
          <Edit sx={{ fontSize: '40px', marginRight: '60px', color: 'primary.main' }} />
        </Link>
        <Delete
          onClick={deleteAsset}
          sx={{ fontSize: '40px', color: 'error.main', cursor: 'pointer' }}
        />
      </Box>
        </>
      )}
    </Container>
  );
};

export default Detail;
