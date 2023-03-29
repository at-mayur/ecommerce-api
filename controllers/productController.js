const Product = require("../models/product");
const Counter = require("../models/counter");


module.exports.createProduct = async function(req, res){

    try {

        let counter = await Counter.findOne({ schema_name: "Product" });

        if(!counter){
            counter = await Counter.create({
                schema_name: "Product",
                schema_counts: {
                    count: 1
                }
            });
        }

        if(counter.schema_counts.deletedIds.length>0){
            let currIndex = counter.schema_counts.deletedIds[0];

            const product = await Product.create({
                id: currIndex,
                product_name: req.body.product_name,
                product_quantity: req.body.product_quantity
            });

            counter.schema_counts.deletedIds.splice(0, 1);
            counter.save();

            return res.status(200).json({
                success: true,
                product,
                msg: "Product added successfully."
            });
        }

        let currIndex = counter.schema_counts.count;

        const product = await Product.create({
            id: currIndex,
            product_name: req.body.product_name,
            product_quantity: req.body.product_quantity
        });

        counter.schema_counts.count = currIndex+1;
        await counter.save();

        return res.status(200).json({
            success: true,
            product,
            msg: "Product added successfully."
        });
        
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: error
        });

    }

};


module.exports.getProductsList = async function(req, res){

    try {
        
        const products = await Product.find({});

        return res.status(200).json({
            success: true,
            products,
            msg: "List of all products."
        });

    } catch (error) {
        
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: error
        });

    }

};


module.exports.deleteProduct = async function(req, res){

    try {
        
        const product = await Product.findOne({id: req.params.id});

        if(!product){
            return res.status(200).json({
                success: false,
                msg: "Product not found. Invalid product id."
            });
        }

        await Product.findOneAndDelete({id: req.params.id});

        await Counter.findOneAndUpdate({ schema_name: "Product" }, { $push: { 'schema_counts.deletedIds': req.params.id } });

        return res.status(200).json({
            success: true,
            msg: "Product deleted Successfully."
        });

    } catch (error) {
        
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: error
        });

    }

};


module.exports.updateProduct = async function(req, res){

    try {
        
        const product = await Product.findOne({id: req.params.id});

        if(!product){
            return res.status(200).json({
                success: false,
                msg: "Product not found. Invalid product id."
            });
        }

        const qty = Number.parseInt(req.query.number);

        product.product_quantity = qty;
        await product.save();

        return res.status(200).json({
            success: true,
            product,
            msg: "Product updated Successfully."
        });

    } catch (error) {
        
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: error
        });

    }

};