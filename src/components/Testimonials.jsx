import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      position: "CEO of Example Corp",
      photo: "https://picsum.photos/150", // Random image URL
      text: "This is the best service I have used in years. Highly recommend it to anyone who needs high-quality products and excellent support.",
    },
    {
      name: "Jane Smith",
      position: "CTO of Tech Innovations",
      photo: "https://picsum.photos/105", // Random image URL
      text: "An amazing experience. The team was extremely professional and the product exceeded my expectations. I would definitely come back.",
    },
    {
      name: "Sam Wilson",
      position: "Founder of Creative Solutions",
      photo: "https://picsum.photos/74", // Random image URL
      text: "A fantastic solution for businesses looking to improve their online presence. The attention to detail and customer service is outstanding.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-8 transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700">{testimonial.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{testimonial.position}</p>
              <p className="text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;