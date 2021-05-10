import React from 'react';
import { Story, Meta } from '@storybook/react';

import {Banner} from './Banner';

export default {
  title: 'PropertyInvest/Banner',
  component: Banner
} as Meta;

export const Standard = () => <Banner/>
export const WithTitles = () => <Banner title='Saigon as it was' subtitle='What happened?'/>
export const WithImage = () => <Banner imageUrl='/static/images/didier-weemaels-ZKVBM2_Dp84-unsplash.jpg'/>

