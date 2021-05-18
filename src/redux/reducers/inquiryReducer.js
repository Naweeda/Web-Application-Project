// hint: 1 case

const INITIAL_STATE = {
  inquiries: [],
};

const inquiryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USER_SET_INQUIRIES':
      return {
        ...state,
        inquiries: action.inquiries
      };
    default:
      return { ...state };
  }
};

export default inquiryReducer;
