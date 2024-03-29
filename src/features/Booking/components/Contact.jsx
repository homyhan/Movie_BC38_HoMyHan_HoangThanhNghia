import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="container mx-auto contact_full">
      <div className="contact">
        <h1>Contact</h1>
        <div className="container">
          <form action="#">
            <div className="user_details">
              <div className="input_pox">
                <span className="contact_datails">Full Name</span>
                <input className="max-w-xs
                sm:max-w-sm
                md:max-w-md
                lg:max-w-lg
                xl:max-w-xl" type="text" placeholder="enter your name" required />
              </div>

              <div className="input_pox">
                <span className="contact_datails">Email</span>
                <input className="max-w-xs
                sm:max-w-sm
                md:max-w-md
                lg:max-w-lg
                xl:max-w-xl" type="text" placeholder="enter your Email" required />
              </div>
              <div className="input_pox">
                <span className="contact_datails">Phone Number</span>
                <input className="max-w-xs
                sm:max-w-sm
                md:max-w-md
                lg:max-w-lg
                xl:max-w-xl" type="text" placeholder="enter your Phone" required />
              </div>
              <div className="input_pox">
                <span className="contact_datails">Content</span>
                <textarea className="max-w-xs
                sm:max-w-sm
                md:max-w-md
                lg:max-w-lg
                xl:max-w-xl" rows={4} placeholder="enter your content" required />
              </div>
            </div>

            <div className="button">
              <input className="max-w-xs
                sm:max-w-sm
                md:max-w-md
                lg:max-w-lg
                xl:max-w-xl" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
