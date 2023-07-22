const Product = require('../models/Products')
const Brand = require('../models/Brand')

exports.getProductService = async (filters, queries) => {
    const products = await Product.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
        const totalProduct = await Product.countDocuments(filters)
    return {totalProduct,products};
}
exports.createProductService = async (data) => {
    const products = await Product.create(data)
    const {_id:productId,brand} = products;

    const res = await Brand.updateOne(
        {_id:brand.id},
        {$push: {products: productId}}
    )
    console.log(res.nModified);
    return products;
}

exports.updateProductService = async (productId, data) => {
    const result = await Product.updateOne({ _id: productId }, { $set: data }, {
        runValidators: true
    });
    // const product = await Product.findById(productId);
    // const result = await product.set(data).save();
    return result;
}

exports.bulkUpdateProductService = async (data) => {
    const result = await Product.updateMany({ _id: data.ids }, data.data, {
        runValidators: true
    })

    // const products = []
    // data.ids.forEach(product =>{
    //     products.push(Product.updateOne({ _id: Product.id}, product.data))
    // });
    // const result = await Promise.all(products);
    // console.log(result);
    return result;
}

exports.deleteProductByIdService = async (id) => {
    const result = await Product.deleteOne({ _id: id });
    return result
}


exports.bulkUpdateProductServiceDeleteById = async (ids) => {
    const result = await Product.deleteMany({})
    return result
}