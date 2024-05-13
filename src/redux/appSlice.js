import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: null,
    orders: null
}

const appSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateProducts: (state, actions) => {
            state.products = actions.payload
        },
        updateOrders: (state, actions) => {
            state.orders = actions.payload
        },
    }
})

export const { updateProducts, updateOrders } = appSlice.actions
export default appSlice.reducer