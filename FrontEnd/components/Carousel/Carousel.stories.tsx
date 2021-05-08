import React from 'react';
import { Meta } from '@storybook/react';
import Carousel from './Carousel';

export default {
  title: 'PropertyInvest/Carousel',
  component: Carousel
} as Meta;

const images = ['/static/images/bg.jpg','/static/images/bg2.jpg','/static/images/bg3.jpg','/static/images/bg4.jpg','/static/images/bg7.jpg',];

export const Standard = () => <Carousel images={images}/>
