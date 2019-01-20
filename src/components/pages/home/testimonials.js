import React from 'react';
import Slider from 'react-slick';
import { Img, Paragraph } from '@/components/ui';

import testImg from '@/components/ui/test-avatar';

const testimonials = [
  {
    company: 'Sel Co.',
    imgSrc: testImg,
    name: 'Selman Kahya',
    text:
      /* eslint-disable-next-line */
      'Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
  },
  {
    company: 'Vehl inc.',
    imgSrc: testImg,
    name: 'Ali Mike',
    text:
      /* eslint-disable-next-line */
      'Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
  },
];

const sliderSettings = {
  arrows: false,
  autoplay: true,
  autoplaySpeed: 4000,
  dots: true,
  dotsClass: 'slick-dots text-white',
  draggable: false,
  infinite: true,
};

const Testimonials = () => (
  <div>
    <Slider {...sliderSettings}>
      {testimonials.map((testimonial, index) => (
        <div key={index.toString()} className="text-center outline-none">
          <Img extraClassName="rounded-full mb-4 mx-auto w-18 h-18" src={testimonial.imgSrc} />
          <Paragraph extraClassName="font-bold text-white mb-1">{testimonial.name}</Paragraph>
          <Paragraph extraClassName="text-lightBlueGrey mb-6">{testimonial.company}</Paragraph>
          <Paragraph extraClassName="apost relative text-white w-8/12 mx-auto mb-10" type="xl">
            {testimonial.text}
          </Paragraph>
        </div>
      ))}
    </Slider>
  </div>
);

Testimonials.propTypes = {};

export default Testimonials;
