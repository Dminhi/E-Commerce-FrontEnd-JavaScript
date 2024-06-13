// Services.js
import React from 'react';
import Service from './Service'; 
import { CreditCardOutlined, HomeOutlined, MobileOutlined, RedEnvelopeOutlined } from '@ant-design/icons';

const services = [
  { icon: <HomeOutlined />, title: 'Thanh toán tiền nước', description: 'Thanh toán nhanh chóng, tiện lợi', backgroundColor: 'bg-blue-200' },
  { icon: <CreditCardOutlined />, title: 'Thanh toán tiền điện', description: 'Thanh toán nhanh chóng, tiện lợi', backgroundColor: 'bg-green-200' },
  { icon: <MobileOutlined />, title: 'Thẻ cào điện thoại', description: 'Giảm 2% cho thẻ mệnh giá từ 100.000đ', backgroundColor: 'bg-yellow-200' },
  { icon: <RedEnvelopeOutlined />, title: 'Thẻ game', description: 'Giảm 2% cho thẻ mệnh giá từ 100.000đ', backgroundColor: 'bg-red-200' },
];

const Services = () => (
  <div className="container mx-auto mt-8">
    <h2 className="text-2xl font-bold mb-4">Dịch vụ tiện ích</h2>
    <div className="grid grid-cols-4 gap-4">
      {services.map((service, index) => (
        <Service key={index} {...service} />
      ))}
    </div>
  </div>
);

export default Services;
