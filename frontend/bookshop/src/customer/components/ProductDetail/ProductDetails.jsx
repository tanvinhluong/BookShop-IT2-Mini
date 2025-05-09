import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../../State/Products/Action";
import { addItemToCart } from "../../../State/Cart/Action";
import { data_mock } from "../../Data/data_mock";
import CommentBox from "../CommentBox/CommentBox";
import UserComment from "../CommentBox/UserComment";
import { API_BASE_URL } from "../../../config/apiConfig";
import axios from "axios";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Dụng cụ học tập", href: "#" },
    { id: 2, name: "Đồ dùng học tập", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductDetails() {
  const [activeImage, setActiveImage] = useState(null);
  const [email, setEmail] = useState("");
  const [visibleCommentBox, setVisibleCommentBox] = useState(true);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const dispatch = useDispatch();
  const [rotationAngle, setRotationAngle] = useState(0);

  const { products } = useSelector((store) => store);
  const { isReviewing, itemId } = location.state || {};

  // notìy when add Product
  const [notification, setNotification] = useState("");
  const jwt = localStorage.getItem("jwt");

  const rotateImage = () => {
    // Rotate by 45 degrees each time
    setRotationAngle((prevAngle) => prevAngle + 45);
  };
  const handleAddToCart = () => {
    const data = { productId: params.productId };
    console.log("Selected data :", data);
    dispatch(addItemToCart(data));

    setNotification("Product added to cart!");

    setTimeout(() => {
      setNotification("");
    }, 3000);
    // navigate('/cart')
  };

  useEffect(() => {
    const data = { productId: params.productId };
    console.log(data);
    dispatch(findProductsById(data));
    fetchUserData();
  }, [params.productId]);

  useEffect(() => {
    if (email) {
      fetchReviews();
    }
  }, [email]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchReviews = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };
    try {
      // Gọi API để lấy reviews cho sản phẩm
      const response = await axios.get(
        `${API_BASE_URL}/api/reviews/product/${params.productId}`,
        config // Cấu hình headers cho request
      );

      console.log("API Response:", response.data);
      let alreadyCommented = response.data.some(
        (review) => review.orderDetailId === itemId
      );
      setVisibleCommentBox(
        !alreadyCommented // nếu như bình luận về orderdetailid này rồi thì ẩn khung comment đi
      );

      const reviewsToMove = response.data.filter(
        (review) => review.userEmail === email
      );

      if (reviewsToMove.length > 0) {
        // Lọc các phần tử có userEmail trùng với email ra khỏi mảng gốc
        response.data = response.data.filter(
          (review) => review.userEmail !== email
        );

        // Thêm các phần tử tìm được lên đầu mảng
        response.data.unshift(...reviewsToMove);
      }

      setComments(response.data); // Lưu dữ liệu reviews vào state
    } catch (error) {
      console.error("Error:", error); // In lỗi nếu có
    }
  };

  const fetchUserData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const response = await axios.get(
        `${API_BASE_URL}/api/users/profile`,
        config
      );
      setEmail(response.data.email);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product?.supplier?.name}
              </a>
            </li>
          </ol>
        </nav>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={activeImage?.src || products?.product?.productImageUrl}
                alt={product.images[0].alt}
                style={{ transform: `rotate(${rotationAngle}deg)` }}
                onClick={rotateImage}
                className="h-full w-full object-cover object-center"
              />
            </div>
            {/* <div  className="flex flex-wrap space-x-5 justify-center">
              {products?.product?.map((item) => (
                <div onClick={()=>handleSetActiveImage(item)} className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div> */}
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2 ">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900 ">
                {products.product?.supplier?.name}
              </h1>
              <h1 className="flex space-x-5 font-extrabold items-center text-lg lg:text-xl text-gray-900 pt-1">
                {products.product?.productName}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>

              <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                <p className="font-extrabold">{products.product?.price} VND</p>
                <p className="font-semibold ">Còn hàng</p>
              </div>
              <div className="flex space-x-5 items-center opacity-60 text-lg lg:text-xl text-gray-900 mt-6">
                <p className="font-sans ">
                  Mô tả về sản phẩm: {products.product?.productDescription}
                </p>
              </div>

              <div className="flex space-x-5 items-center opacity-60 text-lg lg:text-xl text-gray-900 mt-6">
                <p className="font-sans ">
                  Loại sản phẩm: {products?.product?.productDetails?.[0]?.name}
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating
                    name="read-only"
                    value={3.5}
                    precision={0.5}
                    readOnly
                  />
                  <p className="opacity-50 text-sm">
                    {products.product?.numRatings} Rate
                  </p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-400">
                    {reviews.totalCount} Reviews
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900"></h3>
                    {/* <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a> */}
                  </div>
                </div>
                {notification && (
                  <div className="notification">{notification}</div>
                )}
                <Button
                  sx={{ px: "1.5rem", py: "1rem", bgcolor: "#9155fd" }}
                  variant="contained"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {products?.product?.description}
                  </p>
                </div>
              </div>

              {/* <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {isReviewing && visibleCommentBox && <CommentBox itemId={itemId} />}

        {/* Recent Raiting and reviews */}
        <section>
          <h1 className="font-bold text-lg pb-20 pt-20">
            Những bình luận và đánh giá hiện tại
          </h1>

          {comments.map((comment, index) => (
            <UserComment
              key={"comment#" + index}
              reviewId={comment.id}
              email={comment.userEmail}
              rating={comment.rating}
              content={comment.comment}
              productDetailName={comment.productDetailName}
              currentEmail={email}
            />
          ))}

          <div className="broder p-5">
            <Grid container spacing={7}>
              <Grid item xs={7}>
                <div className="space-y-5">
                  {reviews.reviews?.map((item) => (
                    <ProductReviewCard item={item} />
                  ))}
                </div>
              </Grid>

              <Grid item xs={5}>
                <h1 className="text-xl font-semibold pb-2">
                  Mức độ Đánh giá Sản phẩm
                </h1>
                <div className="flex items-center space-x-3">
                  <Rating
                    name="read-only"
                    value={3.6}
                    precision={0.5}
                    readOnly
                  />
                  <p className="opacity-60">5990 lượt đánh giá</p>
                </div>
                <Box className="mt-5 space-y-3">
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Excellent</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={55}
                        color="success"
                      />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Very Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={40}
                        color="primary"
                      />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={59}
                        color="secondary"
                      />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Average</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={20}
                        color="warning"
                      />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Worst</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={20}
                        color="error"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* Similar Products */}
        <section className="pt-10">
          <h1 className="font-bold text-xl py-5">Các sản phẩm tương tự</h1>
          <div className=" flex flex-wrap space-y-5">
            {data_mock.map((item, index) => (
              <HomeSectionCard product={item} key={`product#${index}`} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductDetails;
