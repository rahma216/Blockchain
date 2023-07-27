
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">About Us</Typography>
                <Text variant="h5">TANIT WEB is a global digital agency created in 2007. We support companies in the realization of their digital projects. Our history, our strategic vision and the commitment to convincing results with our clients allow us to support you efficiently and responsively.

Since its creation, TANIT WEB has continued its development and growth strategy by diversifying its services and strengthening its international presence. Its success is based on a real entrepreneurial culture, rigorous management and broad autonomy given to its subsidiaries.
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/kunaltyagi9" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
             
            </Wrapper>
        </Box>
    )
}

export default About;