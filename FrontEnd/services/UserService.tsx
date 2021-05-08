import { IAddressForm } from '@components/AddressForm/IAddressForm';

export const saveAddress = function(data:IAddressForm): void {
    console.log(JSON.stringify(data))
}