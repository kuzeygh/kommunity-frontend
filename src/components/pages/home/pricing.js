import React from 'react';
import { Button, Paragraph, Title } from '@/components/ui';
import Card from '../../ui/card';

const pricingOptions = [{
  label: "Free",
  price: '0',
  currency: '$',
  period: '/month',
  features: [
    'Up to 100 users',
    '5 GB file storage',
    'Support via online chat, email',
    'Subdomain'
  ],
  buttonType: 'outline',
}, {
  label: "Free",
  price: '0',
  currency: '$',
  period: '/month',
  features: [
    'Up to 100 users',
    '5 GB file storage',
    'Support via online chat, email',
    'Subdomain'
  ],
  buttonType: 'outline',
},{
  label: "Pro",
  price: '39',
  currency: '$',
  period: '/month',
  features: [
    'Up to 1.000 user',
    '40 GB file storage',
    'Prime Support ',
    'Your own domain'
  ],
  buttonType: 'primary',
}];

const Pricing = () => (
  <div className="">
    <Title type="h4" extraClassName="font-bold text-center mb-12">
      Choose the plan
    </Title>
    <div className="flex justify-center">
      {pricingOptions.map(pricing => (
        <Card applyPadding={false} shadow="md" extraClassName="mx-4" extraStyle={{width: '30%'}}>
          <Title type="h5" extraClassName="font-bold px-10 py-6">
            {pricing.label}
          </Title>
          <div className="flex bg-paleGrey px-10 py-5">
            <div className="text-5xl leading-xl font-bold mr-1">
              {pricing.price}
            </div>
            <div className="flex flex-1 flex-col">
              <Paragraph extraClassName="font-bold">{pricing.currency}</Paragraph>
              <Paragraph extraClassName="text-blueyGrey" type="sm">{pricing.period}</Paragraph>
            </div>
          </div>
          <div className="px-10 pt-6 py-8">
            {pricing.features.map(feature => (
              <Paragraph extraClassName="text-dark mb-4">{feature}</Paragraph>
            ))}
            <div className="text-center">
              <Button extraClassName="mx-auto mt-2" label="Create Community" styleType={pricing.buttonType} size="large" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

Pricing.propTypes = {};

export default Pricing;
