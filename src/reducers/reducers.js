const initialState = {
  employer: localStorage.employer ? JSON.parse(localStorage.employer) : false,
  student: localStorage.student ? JSON.parse(localStorage.student) : false,
  // highBid: ''
};

export default (state=initialState, action) => {
  switch (action.type) {
    case 'SETSTUDENT':
      return {
        student: !state.student
      };
    case 'SETEMPLOYER':
      return {
        employer: !state.employer
      };
    case 'HIGHBIDTRUE':
      return {
        highBid: true
      };
    case 'HIGHBIDFALSE':
      return {
        highBid: false
      };
    // case 'HIGHBIDINITIAL':
    //   return {
    //     highBid: ''
    //   };
    default:
      return state;
  }
}