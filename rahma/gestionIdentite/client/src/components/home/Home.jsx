import React, { useEffect, useState } from 'react';
import { Grid, Box, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateAssetForm from '/home/tanitweb/rahma/gestionIdentite/client/src/components/create/CreateAssetForm.jsx'; // Update the path to the actual location of the CreateAssetForm component
import { useNavigate } from 'react-router-dom';

const addEllipsis = (str, limit) => {
  return str.length > limit ? str.substring(0, limit) + '...' : str;
};

const Container = styled(Box)(({ theme }) => ({
  border: '1px solid #d3cede',
  borderRadius: 10,
  margin: 20,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  height: 250,
  width: 250,
  backgroundColor: '#f5f5f5',
  padding: 20,
  textAlign: 'center',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const UserLogo = styled('img')({
  width: 60,
  height: 60,
  marginBottom: 25,
});

const Role = styled(Typography)({
  color: '#878787',
  fontSize: 12,
});

const Heading = styled(Typography)({
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
});

const Username = styled(Typography)({
  fontSize: 14,
});

const Email = styled(Typography)({
  fontSize: 14,
  wordBreak: 'break-word',
});

const CenteredContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 'calc(80vh - 160px)', // Adjust the height to accommodate header and footer (assuming each is 80px)
}));

const CenteredGridContainer = styled(Grid)(({ theme }) => ({
  justifyContent: 'center',
}));

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [showCreateAssetForm, setShowCreateAssetForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/assets');
        if (response.status === 200) {
          setAssets(response.data);
        }
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateAssetClick = () => {
    setShowCreateAssetForm(true);
  };

  return (
    <CenteredContainer>
      {/* Conditional rendering to show either the button or the CreateAssetForm */}
      {!showCreateAssetForm && (
        <Box mb={4}>
          <br /><br /><br />
          <button onClick={handleCreateAssetClick}>Create Asset</button>
        </Box>
      )}

      {showCreateAssetForm ? (
        <CreateAssetForm />
      ) : (
        <CenteredGridContainer container spacing={2}>
          {assets?.length ? (
            assets.map((asset) => (
              <Grid item key={asset.Key} lg={3} md={4} sm={6} xs={12}>
                <Link to={`/detail/${asset.Key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Container>
                    <UserLogo src="https://img.icons8.com/?size=512&id=n81E0rhVBhG2&format=png" alt="User Logo" />
                    <Role>{asset.Record.role}</Role>
                    <Heading>{addEllipsis(asset.Record.name, 20)}</Heading>
                    <Username>Username: {asset.Record.username}</Username>
                    <Email>{addEllipsis(asset.Record.email, 100)}</Email>
                  </Container>
                </Link>
              </Grid>
            ))
          ) : (
            <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}></Box>
          )}
        </CenteredGridContainer>
      )}
    
    </CenteredContainer>
  
  );
};

export default Assets;


