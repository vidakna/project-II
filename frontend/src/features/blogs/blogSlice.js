import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { blogService } from "./blogService";



export const getAllBlogs = createAsyncThunk(
    "blogs/get",
     async (thunkAPI) => {
  try {
      return await blogService.getBlogs();
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }

});
export const getABlog = createAsyncThunk(
    "blog/get",
    async (id, thunkAPI) => {
      try {
        return await blogService.getBlog(id);
      } catch (error) {
        // Instead of returning the Axios error, return a structured error object
        return thunkAPI.rejectWithValue({
          status: error.response?.status,
          message: error.response?.data?.message || "An error occurred",
        });

    }
}
);

const blogState={
    blog: [],
    isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const blogSlice = createSlice({
  name: "blog",
  initialState: blogState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      }).addCase(getAllBlogs.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blog = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
     
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      }).addCase(getABlog.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.singleBlog = action.payload;
      })
      .addCase(getABlog.rejected, (state, action) => {
      
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message || "An error occurred";
      });
    },
});

export default blogSlice.reducer
