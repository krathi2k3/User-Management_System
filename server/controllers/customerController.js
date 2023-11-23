const Customer = require('../models/Customer');
const mongoose = require('mongoose');

/**
 * GET/
 * Homepage
 */


exports.homepage = async(req,res)=>{
    const messages = await req.consumeFlash('info');  
    const locals = {
      title: 'NodeJs',
      description: 'Free NodeJs User Management System'
    }
    let perPage = 12;
    let page= req.query.page||1;
    try {
       const customers = await Customer.aggregate([{$sort:{updatedAt: -1}}])
        .skip(perPage * page-perPage)
        .limit(perPage)
        .exec();
       const count = await Customer.count();
       
       res.render('index',{
        locals,
        customer,
        current: page
       })
    


    } catch (error) {
        console.log(error);
    }
}


// exports.homepage = async(req,res)=>{
//     const messages = await req.consumeFlash('info');  
//     const locals = {
//       title: 'NodeJs',
//       description: 'Free NodeJs User Management System'
//     }

//     try {
//        const customers = await Customer.find({}).limit(22);
//        res.render('index', { locals, messages, customers } );
//     } catch (error) {
//         console.log(error);
//     }
// }

/**
 * GET/
 * New Customer Form
 */

  exports.addCustomer = async(req, res) =>{
    const locals = {
        title: 'Add new Customer-NodeJS',
        description:'Free NodeJs user Management System'
    } 
    const messages = "adda";
   
    res.render('customer/add', {messages});
}

/**
 * POST/
 * Create a New Customer 
 */
exports.postCustomer = async(req,res)=>{
    console.log(req.body);

    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        details: req.body.details,
        telephone: req.body.telephone,
        email: req.body.email
    });

    // const locals = {
    //     title: 'New Customer Added!',
    //     description:'Free NodeJs user Management System'
    // }

    try {
        await Customer.create(newCustomer);
        await req.flash('info', 'New customer has been added')
        res.redirect("/");
    } catch (error) {
        console.log(error, );
    }
}