import React, { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import { getImageURLs } from './images'

const IMAGE_LIST = 100
const CARROUSEL_LIST = 5
const WINDOW_BUFFER = 3

const ButtonActions = ({ onNext }: { onNext: any }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button onClick={onNext} variant="contained">Next</Button>
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
  const [imageURLs, setImageURLs] = useState<string[]>([])
  const [fetchedUrls, setFetcedUrls] = useState<string[]>([])
  const [images, setImages] = useState<HTMLImageElement[]>([])

  useEffect(() => {
    const urlsToFetch = imageURLs.slice(0, CARROUSEL_LIST)
    const buildImages = urlsToFetch.map((picture) => {
      const img = new Image();
      img.src = picture;
      return img
    })
    setImages(buildImages)
    setFetcedUrls(prev => [...prev, ...urlsToFetch])
  }, [imageURLs])

  useEffect(() => {
    const imagesUrl = getImageURLs(IMAGE_LIST)
    setImageURLs(imagesUrl)
  }, [])

  const [imageIndex, setImageIndex] = useState(0)

  const handleNextImage = () => {
    setImageIndex(prev => ++prev)
    addImages()
  }

  const addImages = () => {
    const newImages: HTMLImageElement[] = []
    imageURLs.slice(imageIndex + CARROUSEL_LIST, WINDOW_BUFFER + imageIndex + CARROUSEL_LIST).forEach((picture) => {
      if (fetchedUrls.includes(picture)) return
      const img = new Image();
      setFetcedUrls(prev => [...prev, picture])
      img.src = picture;
      newImages.push(img)
    })
    setImages(prev => [...prev, ...newImages])
  }

  return (
    <Box sx={{
      width: '100%',
      background: 'papayawhip',
      display: 'flex',
      justifyContent: 'start',
      flexDirection: 'column',
      alignItems: ' center'
    }}>
      <MainImage image={images[imageIndex]} />
      <Carrousel images={images.slice(imageIndex, imageIndex + 5)} />
      <ButtonActions onNext={handleNextImage} />
    </Box >
  );
}

export default App;
