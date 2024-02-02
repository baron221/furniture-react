import React from 'react';
import '../css/App.css';
import { Box, Container, Stack, Typography } from '@mui/material';

function App() {
  return (
    <Container maxWidth="sm">
      <Stack flexDirection={"column"}>
        <Box sx={{my:4}}>
          <Typography variant='h2' component={"h3"}>
            It is my furniture Reactapp with redux
          </Typography>
        </Box>
      </Stack> 
    </Container>
  );
}

export default App;
