import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk("auth/register", async (user, thunkAPI) => {
  try {
      return await authService.register(user)
  } catch (error) {
      return thunkAPI.rejectWithValue(error)
  }
})

export const loginUser = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
      return await authService.login(user)
  } catch (error) {
      return thunkAPI.rejectWithValue(error)
  }
})

export const getUserProductWishlist=createAsyncThunk(
    "user/wishlist",
    async(thunkAPI)=>{
        try{
            return await authService.getUserWishlist();
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }

})

const getCustomerFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
  user: getCustomerFromLocalStorage,
 
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createdUser = action.payload;
            if(state.isSuccess === true){
                toast.info("User Created Successfully")
            }
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.createdUser = [];
            state.message = action.error;
            if(state.isError === true){
                toast.error(action.payload.response.data.message)
            }
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.user = action.payload;
            
            if(state.isSuccess === true){
                localStorage.setItem("token", action.payload.token)
                toast.info("User Logged In Successfully")
            }
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = [];
            state.message = action.error;
            if(state.isError === true){
                toast.error(action.payload.response.data.message);
            }
        })
        .addCase(getUserProductWishlist.pending, (state) =>{
           state.isLoading=true;

        }).addCase(getUserProductWishlist.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.wishlist=action.payload;
        }).addCase(getUserProductWishlist.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        });
      },
});

export default authSlice.reducer;