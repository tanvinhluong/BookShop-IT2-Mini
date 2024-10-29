import { API_BASE_URL } from '../../../config/apiConfig'
import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
const HomePage = () => {
  const [category, setCategory] = useState([])
  const [productsFilter, setProductsFilter] = useState([])
  const [products, setProducts] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [categoryName, setCategoryName] = useState('')
  const [selectedValue, setSelectedValue] = useState('')
  const jwt = localStorage.getItem('jwt')

  const handleComboBoxChange = (event) => {
    const newValue = event.target.value
    const newIndex = event.target.selectedIndex

    setSelectedValue(newValue)
    setSelectedIndex(newIndex)

    fecthFilterProduct(newValue)
  }

  const fecthFilterProduct = async (categoryName) => {
    try {
      // const config = {
      //   headers: { Authorization: `Bearer ${jwt}` },
      // }
      // const results = await axios.get(
      //   `${API_BASE_URL}/api/products?color=&minPrice=0&maxPrice=1000000&minDiscount=0&category=&stock=null&sort=null&pageNumber=0&pageSize=100`,
      //   config
      // )

      // setProductsFilter(
      //   results.data.content.filter(
      //     (product) => product.category.parentCategory.name === categoryName
      //   )
      // )
      // setCategoryName(categoryName)
      console.log(null)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fecthCategory = async (category) => {
    try {
      const results = await axios.get(`${API_BASE_URL}/api/category/get`)
      setCategory(results.data.map((item) => item.name))
      // console.log(
      //   results.data
      //     .filter((category) => category.level === 2)
      //     .map((item) => item.name)
      // );
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fecthAllProduct = async (category) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      }
      // const results = await axios.get(
      //   `${API_BASE_URL}/api/products?color=&minPrice=0&maxPrice=10000000&minDiscount=0&category=all_products&stock=&sort=&pageNumber=0&pageSize=100`,
      //   config
      // )

      // setProducts(results.data.content)
      // console.log(results.data.content);
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  const { t } = useTranslation()
  useEffect(() => {
    fecthCategory()
    fecthAllProduct()
  }, [])

  return (
    <div>
      <MainCarousel />
      <div
        className="category-select p-4 flex items-center "
        style={{
          fontSize: '1.5rem',
          backgroundColor: 'pink',
        }}
      >
        <div className="mr-2">{t('category')}</div>
        <select
          className="rounded-full w-20"
          value={category[selectedIndex]}
          onChange={handleComboBoxChange}
        >
          {category.map((option, index) => (
            <option key={'combo#' + index}>{option}</option>
          ))}
        </select>
      </div>
      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
        {!!productsFilter.length && (
          <HomeSectionCarousel
            data={productsFilter}
            categoryName={categoryName}
          />
        )}
        <HomeSectionCarousel data={products} categoryName={t('allProducts')} />
      </div>
    </div>
  )
}

export default HomePage
