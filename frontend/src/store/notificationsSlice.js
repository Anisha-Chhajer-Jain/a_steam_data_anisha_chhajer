import { createSlice } from '@reduxjs/toolkit';

const mockNotifications = [
  { id: 1, type: 'info', title: 'New Game Added', message: 'Cyberpunk 2078 was just added to the database.', time: '2 min ago', read: false },
  { id: 2, type: 'success', title: 'Wishlist Updated', message: 'Hollow Knight was added to your wishlist.', time: '1 hr ago', read: false },
  { id: 3, type: 'warning', title: 'Price Drop Alert', message: 'A game on your wishlist dropped in price!', time: '3 hrs ago', read: false },
  { id: 4, type: 'info', title: 'New Review Posted', message: 'Someone reviewed a game you follow.', time: '1 day ago', read: true },
  { id: 5, type: 'success', title: 'Analytics Updated', message: 'Weekly analytics report is ready.', time: '2 days ago', read: true },
];

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: mockNotifications,
  },
  reducers: {
    markAsRead: (state, action) => {
      const n = state.items.find(n => n.id === action.payload);
      if (n) n.read = true;
    },
    markAllAsRead: (state) => {
      state.items.forEach(n => { n.read = true; });
    },
    addNotification: (state, action) => {
      state.items.unshift({ id: Date.now(), read: false, time: 'Just now', ...action.payload });
    },
    deleteNotification: (state, action) => {
      state.items = state.items.filter(n => n.id !== action.payload);
    },
  },
});

export const { markAsRead, markAllAsRead, addNotification, deleteNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
