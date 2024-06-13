import AboutUs from "../layouts/user/AboutUs";
import AddBannerForm from "../pages/admin/banner/AddBannerForm";
import AddUserForm from "../pages/admin/user/AddUserForm";
import Banner from "../pages/user/Banner";
import BannerPage from "../pages/admin/banner/BannerPage";
import BrandPage from "../pages/admin/brand/BrandPage";
import CategoryPage from "../pages/admin/category/CategoryPage";
import ChangePassword from "../pages/user/ChangePassword";
import ColorPage from "../pages/admin/color/ColorPage";
import CommentPage from "../pages/admin/comment/CommentPage";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import EditBannerForm from "../pages/admin/banner/EditBannerForm";
import Feedback from "../pages/admin/feedback/FeedBack";
import HeaderDemo from "../layouts/user/HeaderDemo";
import HomePage from "../pages/useView/HomePage";
import ListOrder from "../pages/user/ListOrder";
import LoginSignup from "../pages/auth/LoginSignup";
import OrderHistory from "../pages/user/OrderHistory";
import OrderPage from "../pages/admin/order/OrderPage";
import PrivateRouteAdmin from "./PrivateRouteAdmin";
import ProductDetailPage from "../pages/admin/productDetail/ProductDetailPage";
import ProductPage from "../pages/admin/product/ProductPage";
import Public from "./Public";
import ReviewPage from "../pages/admin/reviews/ReviewPage";
import Shop from "../pages/useView/Shop";
import ShoppingCart from "../pages/user/ShoppingCart";
import UserDetail from "../pages/admin/user/UserInfo";
import UserPage from "../pages/admin/user/UserPage";
import UserProductDetailPage from "../pages/useView/UserProductDetailPage";
import UserProfile from "../pages/user/UserInfo";
import Wishlist from "../pages/user/WishList";

const routerConfig = [
  {
    path: "/",
    element: <Public />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "UserInfo",
        element: <UserProfile />,
      },

      {
        path: "/WishList",
        element: <Wishlist />,
      },
      {
        path: "/history",
        element: <ListOrder />,
      },
      {
        path: "/checkout",
        element: <ShoppingCart />,
      },
      {
        path: "/productDetail/:id",
        element: <UserProductDetailPage />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
    ],
  },
  {
    path: "/login-signup",
    element: <LoginSignup></LoginSignup>,
  },
  {
    path: "/admin",
    element: <PrivateRouteAdmin />,
    children: [
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "comment",
        element: <CommentPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "feedback",
        element: <Feedback />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
      {
        path: "review",
        element: <ReviewPage />,
      },

      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "product-detail",
        element: <ProductDetailPage />,
      },
      {
        path: "categories",
        element: <CategoryPage />,
      },
      {
        path: "brand",
        element: <BrandPage />,
      },
      {
        path: "color",
        element: <ColorPage />,
      },
      {
        path: "addUser",
        element: <AddUserForm />,
      },
      {
        path: "userInfo/:id",
        element: <UserDetail />,
      },
      {
        path: "banner",
        element: <BannerPage />,
      },
      {
        path: "addBanner",
        element: <AddBannerForm />,
      },
      {
        path: "editBanner/:id",
        element: <EditBannerForm />,
      },
    ],
  },
];

export default routerConfig;
