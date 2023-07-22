const Product = require('../models/Products.js')
const { getProductService, createProductService, updateProductService, bulkUpdateProductService, deleteProductByIdService, bulkUpdateProductServiceDeleteById } = require('../services/product.services.js')

exports.getProducts = async (req, res, next) => {
  try {
    let filters = { ...req.query }
    const excludeField = ['sort', 'page', 'limit']
    excludeField.forEach(field => delete filters[field])

    let filtersString = JSON.stringify(filters)
    filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match=> `$${match}`)
    filters = JSON.parse(filtersString);

    const queries = {} 
    if(req.query.sort){
      const sortBy=req.query.sort.split(',').join(' ')
      queries.sortBy=sortBy
      console.log("This is Sort:",sortBy);
    }
    if(req.query.fields){
      const fields=req.query.fields.split(',').join(' ')
      queries.fields=fields
      console.log("This is Field:",fields);

    }

    if(req.query.page){
      const {page=1, limit=10} = req.query;
      const skip = (page -1)*parseInt(limit);
      queries.skip=skip;
      queries.limit=parseInt(limit);
    }

    const products = await getProductService(filters, queries);
    res.status(200).json({
      status: "success",
      data: products
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    })
  }
}

exports.createProduct = async (req, res, next) => {

  try {
    // save or create
    const product = await createProductService(req.body);
    // result.logger()
    res.status(200).json({
      status: 'success',
      message: 'Data inserted successfully!',
      data: product
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Data is not inserted',
      error: error.message
    })
  }
}


exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body);

    res.status(200).json({
      status: 'success',
      message: 'Successfully updated the product',
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Could Not Update The Product",
      error: error.message
    })
  }
}

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Successfully updated the product',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Could Not Update The Product",
      error: error.message
    })
  }
}



exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Could not delete the product"
      })
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully Delete The Product  !',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Could Not Delete The Product",
      error: error.message
    })
  }
}

exports.bulkUpdateProductDelete = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await bulkUpdateProductServiceDeleteById(req.body.ids);

    res.status(200).json({
      status: 'success',
      message: 'Successfully delete the product',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Could Not delete The Product",
      error: error.message
    })
  }
}


exports.fileUpload = async (req, res, next) => {
  try {
    // const result = await bulkUpdateProductServiceDeleteById(req.body.ids);
    res.status(200).json(req.file);
  } catch (error) {
  
  }
}