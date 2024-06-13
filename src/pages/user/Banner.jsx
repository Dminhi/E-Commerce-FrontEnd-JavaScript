import { useEffect, useState } from "react";

import { BANNER_ACTIVE } from "../../redux/api/service/bannerService";
import { Carousel } from "antd";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const bannersData = await BANNER_ACTIVE();
        setBanners(bannersData.content);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-10">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      ) : (
        <Carousel {...settings}>
          {banners.map((banner, index) => (
            <div key={index} className="relative">
              <img
                src={banner.image}
                alt={banner.bannerName}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Banner;
