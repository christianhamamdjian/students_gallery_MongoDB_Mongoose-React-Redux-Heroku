/*
 * search reducers
 */
import { SEARCH_STUDENTS } from "./types";
const initialState = {
  students: [],
  loading: false
};
// itemsFilter = input => {
//   const { students } = this.props;
//   return input
//     ? students.filter(item =>
//         item.firstName.toLowerCase().includes(input.toLowerCase())
//       )
//     : students;
// };
export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_STUDENTS:
      return { ...state, students: [...state.students, action.payload] };
    default:
      return state;
  }
}
