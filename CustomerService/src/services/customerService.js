import "dotenv/config"
import { CustomerModel } from "../models/customerModel"
import mongoose from "mongoose"

const customerModel = mongoose.model('Customer', new CustomerModel);
export class CustomerService {
    constructor(){
    }
    
    createCustomer = async (data) => {
        try {
            let customer = customerModel(data);
            return customer.save();
        } catch (error) {
            throw error;
        }
    }

    updateCustomer = async (data) => {
        try {
            let customer = await customerModel.findByIdAndUpdate(data._id, {$set: data}, {new: true});
            return customer;
        } catch (error) {
            throw error;
        }
    }

    getAllCustomers = async () => {
        try {
            return await customerModel.find({});
        } catch (error) {
            throw error;
        }
    }

    getCustomer = async (customerId) => {
        try {
            let customer = await customerModel.findById(customerId);
            if(customer)
            {
                return customer
            }
            throw "Customer not found!";
        } catch (error) {
            throw error;
        }
    }

    deleteCustomer = async (customerId) => {
        try {
            return await customerModel.findByIdAndDelete(customerId);
        } catch (error) {
            throw error;
        }
    }
    
}