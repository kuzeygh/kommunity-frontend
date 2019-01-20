import React from 'react';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';

import HomeHero from './home/hero';
import FeaturedCommunities from '@/containers/pages/home/featured-communities';
import Features from './home/features';
import Testimonials from './home/testimonials';
import Pricing from './home/pricing';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <div className="bg-gray-gradient">
        <div className="container">
          <Header />
          <div className="home py-24">
            <HomeHero />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="featured-communities mt-10 pt-20">
          <FeaturedCommunities />
        </div>
        <div className="features mt-10 pt-20">
          <Features />
        </div>
      </div>
      <div className="bg-primary mt-32">
        <div className="container">
          <div className="testimonials pt-20 pb-32">
            <Testimonials />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="featured-communities mt-32">
          <Pricing />
        </div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
