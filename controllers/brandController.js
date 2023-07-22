const { createBrandService, getBrandsService, getBrandByIdService, updateBrandByIdService } = require("../services/brand.services");

exports.createBrand = async (req, res, next) =>{
    try {
        const result = await createBrandService(req.body);
        res.status(200).json({
            status: "success",
            message: "successfully created the Brand",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Could't create the brand"
        })
    }
}


exports.getBrands = async (req, res, next) =>{
    try {
        const result = await getBrandsService(req.body);
        res.status(200).json({
            status: "success",
            message: "successfully created the Brand",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Could't create the brand"
        })
    }
}

exports.getBrandById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const brand = await getBrandByIdService(id);
  
      if(!brand){
        return res.status(400).json({
          status: "fail",
          error: "Couldn't find a brand with this id"
        })
      }
  
      res.status(200).json({
        status: "success",
        data: brand,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: "fail",
        error: "Couldn't get the brands",
      });
    }
  };


exports.updateBrand = async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await updateBrandByIdService(id, req.body);
  console.log(result.nModified);
      if(!result){
        return res.status(400).json({
          status: "fail",
          error: "Couldn't update the brand with this id",
        })
      }
  
      res.status(200).json({
        status: "success",
        message: "Successfully updated the Brand"
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: "fail",
        error: "Couldn't update the brands",
      });
    }
  };