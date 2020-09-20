// Storage info parsing
const convertByteSizeRecursively = (size = 0, n = 0) => {
  if (size >= 2**10) {
    return convertByteSizeRecursively(size / 2**10, n + 1);
  } else {
    return {size, n};
  }
};

const units = Object.freeze({
  0: 'B',
  1: 'KB',
  2: 'MB',
  4: 'GB',
  5: 'TB'
});

export const byteSizeToHumanRedable = (byteSize = 0, sizeUnits = units) => {
  const {size, n} = convertByteSizeRecursively(byteSize);
  return `${size} ${sizeUnits[n]}`;
};


// Word pluralization
export const pluralize = (n = 0, word = '') => {
  if (Math.abs(n) > 1) {
    word.endsWith('s') ? word += 'es' : word += 's';
  }
  return `${n} ${word}`
};


// User info parsing
export const getUserNb = (nb = 0, max = 0) => {
  if (max > 0) {
    return `${nb} - ${pluralize(max, 'user')}`;
  } else {
    return pluralize(nb, 'user');
  } 
};

export const perUser = (maxUser = 0) => {
  return maxUser > 0 ? ' per user' : null;
};


// Domain info parsing
export const getDomainNb = (nb = 0) => {
  if (nb === 0) {
    return 'No domain support';
  } else {
    return `Supports ${pluralize(nb, 'domain')}`;
  }
};


// VPN info parsing
export const getVPNOption = (nb = 0) => {
  return nb > 0 ? 'Includes ProtonVPN' : 'ProtonVPN (optional)';
};


// Price info parsing
const priceRounding = price => {
  if (!Number.isInteger(price)) {
    price = `\u007E ${price.toFixed(2)}`;
  }

  return price;
};

export const monthlyPrice = (pricing, cycle) => {
  let price = pricing[cycle];
  price = price / cycle;

  return priceRounding(price / 100);
};

export const annualPrice = (pricing, cycle) => {
  let price = pricing[cycle];
  
  if (cycle < 12) {
    price = price * (12 / cycle);
  } else if (cycle > 12) {
    price = price / (cycle / 12);
  }

  return priceRounding(price / 100);
};

export const currencySymbol = (currency = 'EUR') => {
  switch (currency) {
    case 'EUR':
      return '\u20AC';

    case 'USD':
      return '\uFF04';

    default:
      return currency;
  }
};
