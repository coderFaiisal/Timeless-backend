import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationFields } from '../../constant/pagination';
import { productFilterableFields } from './product.constant';
import { IProduct } from './product.interface';
import { ProductService } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const { ...productData } = req.body;

  const result = await ProductService.createProduct(productData);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const addProductReview = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id;
  const review = req.body;

  const result = await ProductService.addProductReview(productId, review);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review added successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id;

  const result = await ProductService.getSingleProduct(productId);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProductService.getAllProducts(
    filters,
    paginationOptions,
  );

  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id;
  const user = req.user;
  const { ...updatedData } = req.body;

  const result = await ProductService.updateProduct(
    productId,
    user,
    updatedData,
  );

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id;
  const user = req.user;

  const result = await ProductService.deleteProduct(productId, user);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  addProductReview,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};