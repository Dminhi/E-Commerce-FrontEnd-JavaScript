// Service.js
import React from 'react';
import { CreditCardOutlined, HomeOutlined, MobileOutlined, RedEnvelopeOutlined } from '@ant-design/icons';

const Service = ({ icon, title, description, backgroundColor }) => (
  <div className={`p-4 rounded-lg shadow-md bg-white ${backgroundColor}`}>
    <div className="text-3xl text-blue-500 mb-2">{icon}</div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p>{description}</p>
  </div>
);

export default Service;
