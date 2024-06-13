import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';

const contentStyle = {
  height: '300px',
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#364d79',
};

const CarouselItems = () => (
  <Carousel effect="fade" autoplay>
    <div>
      <img
        style={{ width: '100%' }}
        src="https://your-image-url.com/vpbank.jpg"
        alt="VPBank Offer"
      />
      <div style={{ ...contentStyle, lineHeight: 'normal', background: 'none' }}>
        <h3>Ưu đãi từ VPBank</h3>
        <p>Ưu đãi lên đến 1.700.000đ.</p>
      </div>
    </div>
    <div>
      <img
        style={{ width: '100%' }}
        src="https://your-image-url.com/muadee.jpg"
        alt="Muadee Offer"
      />
      <div style={{ ...contentStyle, lineHeight: 'normal', background: 'none' }}>
        <h3>Ưu đãi từ Muadee</h3>
        <p>Trả góp giảm đến 1 triệu đồng, không cần trả trước.</p>
      </div>
    </div>
    <div>
      <img
        style={{ width: '100%' }}
        src="https://your-image-url.com/zalopay.jpg"
        alt="ZaloPay Offer"
      />
      <div style={{ ...contentStyle, lineHeight: 'normal', background: 'none' }}>
        <h3>Ưu đãi từ ZaloPay</h3>
        <p>Giảm đến 300.000đ, áp dụng tất cả sản phẩm trừ Apple.</p>
      </div>
    </div>
  </Carousel>
);

export default CarouselItems;
