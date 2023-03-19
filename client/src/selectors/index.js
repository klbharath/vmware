import { createSelector } from "@reduxjs/toolkit";

export const selectState = (state) => state?.menus || {};
export const selectStateMenu = createSelector(
  selectState,
  (state) => state?.menus || []
);
export const selectMenus = createSelector(selectState, (state) => {
  const { menus = [] } = state;
  return menus?.reduce((acc, curr) => {
    const { name, id, date } = curr;
    return [...acc, { name, id, date: new Date(date).toLocaleDateString() }];
  }, []);
});
