import React  from 'react';
import { Button, Box } from '@mui/material';

const IMAGE_LIST = 100
const CARROUSEL_LIST = 5
const WINDOW_BUFFER = 3

const ButtonActions = () => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button variant="contained">Next</Button>
    </Box>
  )
}

const MainImage = ({ image }: { image?: HTMLImageElement }) => {
  return <Box>
    {image ?
      <img src={image.src} alt={image.alt}></img>
      : <span>no image</span>}
  </Box>
}

const PreviewImage = ({ image }: { image: HTMLImageElement }) => {
  return (<img src={image.src} alt={image.alt} width={30} />)
}

const Carrousel = ({ images }: { images?: HTMLImageElement[] }) => {
  return <Box>
    {images?.map((image) => <PreviewImage image={image} />)}
  </Box>
}

const App = () => {
  return (
    <Box sx={{
      width: '100%',
      background: 'papayawhip',
      display: 'flex',
      justifyContent: 'start',
      flexDirection: 'column',
      alignItems: ' center'
    }}>
      <MainImage  />
      <Carrousel  />
      <ButtonActions  />
    </Box >
  );
}

export default App;
