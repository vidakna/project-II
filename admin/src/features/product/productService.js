import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};

const updateProduct = async (product , productId) => {
  console.log(product)
  console.log(productId)
  const response = await axios.put(`${base_url}product/${productId}`, product, config);

  return response.data;
};

const deleteProduct = async (product) => {
  const response = await axios.delete(`${base_url}product/${product}`, config);
  console.log(response)

};

const getSingleProduct=async(id)=>{
  const response = await axios.get(`${base_url}product/${id}`);

  if(response.data){
    return response.data;
  }
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getSingleProduct
};

export default productService;
