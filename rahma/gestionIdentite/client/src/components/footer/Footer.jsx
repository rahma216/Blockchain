import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { GitHub, Twitter, Instagram, LinkedIn, Facebook } from '@mui/icons-material';

const Footer = () => {
  return (

    <Box sx={{ bgcolor: '#f5f5f5', py: 3 }}>
        <br /><br />
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
     
        <Typography variant="body2" color="text.secondary" align="center">
          Get connected with us on social networks:
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 2 }}>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            <Facebook />
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            <Twitter />
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            <Instagram />
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            <LinkedIn />
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            <GitHub />
          </Link>
        </Box>
      </Container>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
        © {new Date().getFullYear()} Tanit Web. All rights reserved.
      </Typography>
      <br /><br />
    </Box> 
  );
};

export default Footer;
