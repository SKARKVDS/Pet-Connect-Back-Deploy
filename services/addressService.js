const addressRepository = require('../repositories/addressRepository');


exports.addOrGetAddress = async (number, street, city, country) => {
    const tab = await addressRepository.getAddressByAttributes(number, street, city, country);

    if(tab.length > 0){
        return tab[0].id
    }

    const newAddress = await addressRepository.addAddress({number: number, street: street, city: city, country: country});

    return newAddress.id;
};

exports.clearUnusedAddresses = async () => {
    return await addressRepository.clearUnusedAddresses();
};
