const favoritesReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      return { items: [...state.items, action.payload] };

    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        items: state.items.filter(
          (location) => location.CityId !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default favoritesReducer;
