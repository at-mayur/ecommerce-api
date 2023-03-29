const Product = require("../models/product");
const Counter = require("../models/counter");

// Action for creating new product
module.exports.createProduct = async function(req, res){

    try {

        // get counter to fetch current id for product
        let counter = await Counter.findOne({ schema_name: "Product" });

        // if counter does not exist. i.e. Creating our first product.
        if(!counter){
            // Initiate new instance of counter with currIndex 1.
            counter = await Counter.create({
                schema_name: "Product",
                schema_counts: {
                    count: 1
                }
            });
        }

        // if counter exists & our products list has any deleted product previously.
        // Hence Re using that id.
        if(counter.schema_counts.deletedIds.length>0){
            // Get first deleted id from counter deletedIds.
            let currIndex = counter.schema_counts.deletedIds[0];

            // Create new product with that id.
            const product = await Product.create({
                id: currIndex,
                product_name: req.body.product_name,
                product_quantity: req.body.product_quantity
            });

            // Remove that id deletedIds list from counter.
            counter.schema_counts.deletedIds.splice(0, 1);
            counter.save();

            // return json response.
            return res.status(200).json({
                success: true,
                product,
                msg: "Product added successfully."
            });
        }

        // if no previously deleted id exists.
        // get currId from counter.
        let currIndex = counter.schema_counts.count;

        // create new product with that id.
        const product = await Product.create({
            id: currIndex,
            product_name: req.body.product_name,
            product_quantity: req.body.product_quantity
        });

        // increment currId value in counter.
        counter.schema_counts.count = currIndex+1;
        await counter.save();

        // return json response.
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


// Action to get all products list.
module.exports.getProductsList = async function(req, res){

    try {
        
        // get all products list.
        const products = await Product.find({});

        // return json response.
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


// Action to delete a product
module.exports.deleteProduct = async function(req, res){

    try {
        
        // find product with given id.
        const product = await Product.findOne({id: req.params.id});

        // if product does not exists.
        // return result with success false.
        if(!product){
            return res.status(200).json({
                success: false,
                msg: "Product not found. Invalid product id."
            });
        }

        // if product exists then delete that product.
        await Product.findOneAndDelete({id: req.params.id});

        // Add deleted product's id to counter's deletedIds list
        await Counter.findOneAndUpdate({ schema_name: "Product" }, { $push: { 'schema_counts.deletedIds': req.params.id } });

        // return successful response.
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


// Action to update product.
module.exports.updateProduct = async function(req, res){

    try {
        
        // get product with given id.
        const product = await Product.findOne({id: req.params.id});

        // if product does not exists.
        // return result with success false.
        if(!product){
            return res.status(200).json({
                success: false,
                msg: "Product not found. Invalid product id."
            });
        }

        // get quantity provided as query with url.
        // Parse it to number.
        const qty = Number.parseInt(req.query.number);

        // Update product's quantity.
        product.product_quantity = qty;
        await product.save();

        // return successful result.
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