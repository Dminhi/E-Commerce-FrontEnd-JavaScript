import { Avatar, Button, Card, Col, Form, Input, Row } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";

import React from "react";

const { Meta } = Card;

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "CEO",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    description:
      "Alice is the visionary behind our company, leading us with passion and expertise.",
  },
  {
    name: "John Doe",
    role: "CTO",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    description:
      "John is the tech genius who ensures our platform runs smoothly.",
  },
  // Add more team members as needed
];

const testimonials = [
  {
    name: "Jane Smith",
    feedback:
      "This store has the best electronics at unbeatable prices! Highly recommend.",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    name: "Robert Brown",
    feedback: "Fantastic customer service and fast shipping. A+ experience!",
    avatar: "https://randomuser.me/api/portraits/men/49.jpg",
  },
  // Add more testimonials as needed
];

const AboutUs = () => {
  const handleSubmit = (values) => {
    console.log("Received values: ", values);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-4">About Us</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Welcome to our e-commerce store! We are dedicated to providing you
            with the best online shopping experience. Our store offers a wide
            range of electronic products, from the latest gadgets to everyday
            essentials. We strive to deliver high-quality products at
            competitive prices, with fast and reliable shipping.
          </p>
        </Card>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <Card className="shadow-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Our mission is to offer an unparalleled selection of the very best
              electronics, an unbeatable shopping experience, prompt shipping,
              and exceptional customer service. We aim to meet and exceed your
              expectations every time you shop with us.
            </p>
          </Card>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Meet Our Team</h3>
          <Row gutter={16}>
            {teamMembers.map((member, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card className="shadow-lg mb-4">
                  <Meta
                    avatar={<Avatar src={member.avatar} />}
                    title={member.name}
                    description={member.role}
                  />
                  <p className="mt-2 text-gray-700">{member.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Testimonials</h3>
          <Row gutter={16}>
            {testimonials.map((testimonial, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card className="shadow-lg mb-4">
                  <Meta
                    avatar={<Avatar src={testimonial.avatar} />}
                    title={testimonial.name}
                    description={testimonial.feedback}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <Card className="shadow-lg p-4">
            <Form name="contact" layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="message"
                label="Message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Message" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
