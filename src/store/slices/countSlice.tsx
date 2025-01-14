import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Use PascalCase for type names
interface Count {
    value: number;
}

// Initial state definition
const initialState: Count = {
    value: 0,
};

// Create the slice
const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        setValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

// Export actions and reducer
export const { increment, decrement, setValue } = countSlice.actions;
export default countSlice.reducer;

// Export the type for use in RootState
export type CountState = Count; // Export the state type
