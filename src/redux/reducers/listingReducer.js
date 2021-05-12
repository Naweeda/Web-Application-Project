// hint: there should be 5 cases, 1 case per action type

const INITIAL_STATE = {
  description: '',
  type: '',
  price: '',
  title: '',
  listings: [],
};

const listingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USER_SET_DESCRIPTION':
      return {
        ...state, // shallow copy the state
        description: action.description,
      };
    case 'USER_SET_TYPE':
      return {
        ...state,
        type: action.type1,
      };
    case 'USER_SET_PRICE':
      return {
        ...state,
        price: action.price,
      };
    case 'USER_SET_TITLE':
      return {
        ...state,
        title: action.title,
      };
    case 'USER_SET_LISTINGS':
      return {
        ...state,
        listings: action.listings,
      };
    default:
      return { ...state };
  }
};

export default listingReducer;
