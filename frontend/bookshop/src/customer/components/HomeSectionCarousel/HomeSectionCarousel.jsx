import React, { useRef, useState, useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel'
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard'
import { Button, Typography } from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import axios from 'axios'
import { API_BASE_URL } from '../../../config/apiConfig'

const HomeSectionCarousel = ({ data, categoryName }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null)
  const jwt = localStorage.getItem('jwt')
  const [products, setProducts] = useState([])

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.4 },
  }

  const slideNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext()
    }
  }

  const slidePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev()
    }
  }

  const fecthData = async (category) => {
    try {
      const results = await axios.get(
        `${API_BASE_URL}/api/products/getAll?pageNumber=0&pageSize=100`
      )

      setProducts(results.data.content)
      console.log(results.data.content)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fecthData()
  }, [])

  const syncActiveIndex = ({ item }) => setActiveIndex(item)

  const items = data.map((item) => (
    <HomeSectionCard product={item} productId={item.id} />
  ))

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      <Typography
        variant="h5"
        component="h2"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        {categoryName ? categoryName : 'Sản Phẩm'}
      </Typography>
      <div className="relative p-5 shadow-black shadow-md ">
        <AliceCarousel
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
          mouseTracking
          ref={carouselRef}
        />
        {activeIndex !== items.length - 3 && (
          <Button
            variant="contained"
            className="z-50 bg-[]"
            onClick={slideNext}
            sx={{
              position: 'absolute',
              top: '8rem',
              right: '-3rem',
              transform: 'translateX(50%) rotate(90deg)',
              bgcolor: 'white',
            }}
            aria-label="next"
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: 'rotate(90deg)', color: 'black' }}
            />
          </Button>
        )}

        {activeIndex !== 0 && (
          <Button
            variant="contained"
            className="z-50 "
            onClick={slidePrev}
            sx={{
              position: 'absolute',
              top: '8rem',
              left: '-3rem',
              transform: 'translateX(-50%) rotate(90deg)',
              bgcolor: 'white',
            }}
            aria-label="prev"
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: 'rotate(-90deg)', color: 'black' }}
            />
          </Button>
        )}
      </div>
    </div>
  )
}

export default HomeSectionCarousel
