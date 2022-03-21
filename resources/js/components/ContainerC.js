import React from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function ContainerC() {
    return(
        <div>
            <Container maxWidth="99%">
                <Box sx={{ bgcolor: 'black', height:'100vh' }} />
            </Container>
        </div>
    );
}

export default ContainerC;