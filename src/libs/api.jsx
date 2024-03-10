const { default: ProductItem } = require("@/components/layout/ProductItem");

export const getProducts = async (page, limit) => {
  const skip = (page - 1) * limit;
  const products = await ProductItem.find().skip(skip).limit(limit);
  return products;
};

export const getTotalPages = async (limit) => {
  const totalProducts = await ProductItem.countDocuments();
  const totalPages = Math.ceil(totalProducts / limit);
  return totalPages;
};
