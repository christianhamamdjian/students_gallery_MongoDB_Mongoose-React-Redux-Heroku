export const reducer = (state = [], action) => {
  switch (action.type) {
    case "GET_STUDENTS":
      return [...state, ...action.students];

    case "ADD_STUDENT":
      return state.concat([action.payload]);

    // case "ADD_STUDENT":
    //   return [...state, ...action.payload];

    case "DELETE_STUDENT":
      return state.filter(student => student._id !== action.id);

    // case "EDIT_STUDENT":
    //   return state.map(
    //     student =>
    //       student._id === action.id
    //         ? { ...student, editing: !student.editing }
    //         : student
    //   );
    case "UPDATE_POST":
      return state.map(post => {
        if (post.id === action.id) {
          return {
            ...post,
            title: action.payload.newTitle,
            category: action.payload.newCategory,
            content: action.payload.newContent
          };
        } else return post;
      });

    case "UPDATE_STUDENT":
      return state.map(student => {
        if (student._id === action.payload._id) {
          console.log("Updated Student:", action.payload);
          return {
            ...student,
            _id: action.payload._id,
            src: action.payload.newSrc,
            alt: action.payload.newAlt,
            firstName: action.payload.newFirstName,
            lastName: action.payload.newLastName,
            title: action.payload.newTitle,
            nationality: action.payload.newNationality,
            skills: action.payload.newSkills,
            whySofterDeveloper: action.payload.newWhySofterDeveloper,
            longTermVision: action.payload.newLongTermVision,
            motivatesMe: action.payload.newMotivatesMe,
            favoriteQuote: action.payload.newFavoriteQuote,
            joinedOn: action.payload.newJoinedOn
          };
        } else return student;
      });

    default:
      return state;
  }
};
