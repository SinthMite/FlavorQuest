import React, { useState, useEffect } from 'react';
import './Home.scss';
import bannerHome from '../assetImages/platedfood.mp4';
import img1 from '../assetImages/home/img1.webp';
import img2 from '../assetImages/home/img2.webp';
import img3 from '../assetImages/home/img3.webp';
import img4 from '../assetImages/home/img4.webp';
import img5 from '../assetImages/home/img5.webp';
import img6 from '../assetImages/home/img6.webp';
import img7 from '../assetImages/home/img7.webp';
import img8 from '../assetImages/home/img8.webp';
import img9 from '../assetImages/home/img9.webp';
import img10 from '../assetImages/home/img10.webp';
import img11 from '../assetImages/home/img11.webp';
import walk from '../assetImages/home/walk.webp'
import tables from '../assetImages/home/tables.webp';
const images = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11
];

export default function Home({ ApiCatcher }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='bannerHome'>
        <video src={bannerHome} autoPlay loop muted></video>
        <h2>FlavorQuest</h2>
      </div>
      <div>
        <h3>
          The FlavorQuest is home to the most iconic panoramic views of the New York City skyline.
        </h3>
        <p>
          With our newly revitalized Grill Room and Bar, and elegant private event spaces, The FlavorQuest
          is ready to welcome you for any occasion—from weddings and anniversaries to dinners and weekend brunch.
        </p>
        <p>
          The gem of Essex County and New Jersey, The FlavorQuest is a landmark venue where exceptional food and service create memories to last a lifetime.
        </p>
      </div>
      <section className='carouselSection'>
      <div className='carousel'>
        <button onClick={handlePrev} className='carousel-button prev'>‹</button>
        <ul className='carousel-images'>
          {images.map((image, index) => (
            <li key={index} className={index === currentIndex ? 'active' : ''}>
              <img src={image} alt={`Image ${index + 1}`} />
            </li>
          ))}
        </ul>
        <button onClick={handleNext} className='carousel-button next'>›</button>
      </div>
      <button className='button-view-menu'>View Menu</button>
      </section>
      <section className='eventSection'>
        <li>
          <h2>Dining at The Highlawn</h2>
          <img src={tables} alt="" />
          <p>The FlavorQuest provides elegant New American dining with sweeping views of New York City. Our award-winning culinary team looks forward to welcoming you at each of our newly renovated restaurants, including The Grill, The Bar and The Patio at The FlavorQuest.</p>
          <button>Explore Dining</button>
        </li>
        <li>
          <h2>Weddings & Events</h2>
          <img src={walk} alt="" />
          <p>The FlavorQuest is one of the tri-state area’s most magical venues for weddings, anniversaries, bar and bat mitzvahs, birthdays, corporate events and celebrations of any kind. We are honored to have hosted more than a thousand weddings over the past three decades, and our event specialists take pride in making every one unique.</p>
          <button>Explore Celebration</button>
        </li>
      </section>
      <section className='contactUs-section'>
        <h2>Contact Us</h2>
        <p>Would you like to host a corporate event, private or group dining experience or other celebration at The FlavorQuest? Please drop us a line and one of our friendly event specialists will be in touch right away.</p>
        <button>Book an Event</button>
      </section>
    </>
  );
}
