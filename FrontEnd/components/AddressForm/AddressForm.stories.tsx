import React from 'react';
import { Meta } from '@storybook/react';
import {AddressForm} from './AddressForm';

export default {
  title: 'PropertyInvest/AddressForm',
  component: AddressForm
} as Meta;

export const Standard = () => <AddressForm />
