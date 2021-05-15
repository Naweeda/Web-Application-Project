export const setDescription = description => ({
  type: 'USER_SET_DESCRIPTION',
  description,
});

export const setType = type1 => ({
  type: 'USER_SET_TYPE',
  type1,
});

export const setPrice = price => ({
  type: 'USER_SET_PRICE',
  price,
});

export const setTitle = title => ({
  type: 'USER_SET_TITLE',
  title,
});

export const setListings = listings => ({
  type: 'USER_SET_LISTINGS',
  listings,
});

export const setSingleListing = singleListing => ({
  type: 'USER_SET_SINGLELISTING',
  singleListing,
});