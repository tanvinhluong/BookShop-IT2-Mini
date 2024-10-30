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
      const categoryResults = await axios.get(
        `${API_BASE_URL}/api/category/get`
      )
      const category = categoryResults.data.find(
        (cat) => cat.name === categoryName
      )

      if (!category) {
        console.error('Category không tìm thấy.')
        return
      }

      const results = await axios.get(
        `${API_BASE_URL}/api/products/getAll?pageNumber=0&pageSize=100`
      )

      const filteredProducts = results.data.content.filter((product) =>
        product.categoryDetails?.some(
          (catDetail) => catDetail.id === category.id
        )
      )

      setProductsFilter(filteredProducts)
      setCategoryName(categoryName)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fecthCategory = async (category) => {
    try {
      const results = await axios.get(`${API_BASE_URL}/api/category/get`)
      setCategory(results.data.map((item) => item.name))
      // console.log(
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fecthAllProduct = async (category) => {
    try {
      const results = await axios.get(
        `${API_BASE_URL}/api/products/getAll?pageNumber=0&pageSize=100`
      )

      setProducts(results.data.content)
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
