import React from 'react';

const ContactPage = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Contact Us</h1>
      <div className="card p-4">
        <p>
          Have questions, feedback, or suggestions? We'd love to hear from you!
          Please reach out to us using the information below.
        </p>
        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item">
            <strong>Email:</strong> adityauparkarg@gmail.com
          </li>
          <li className="list-group-item">
            <strong>Address:</strong> Vishal nagar, pimple nilakh, pune, maharashtra
          </li>
        </ul>
        
        <p className="mt-5 mb-3 text-center">
          Contact form coming soon!
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
