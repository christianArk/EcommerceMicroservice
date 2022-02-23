import { Response } from "../utils/response"

export class CustomerController 
{
    constructor(customerService){
        this.customerService = new customerService
    }
    
    createCustomer = async (req, res) => {
        try {
            await this.customerService.createCustomer(req.body).then(data => {
                res.json(new Response("Customer created", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    updateCustomer = async (req, res) => {
        try {
            await this.customerService.updateCustomer(req.body).then(data => {
                res.json(new Response("Customer updated", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getAllCustomers = async (req, res) => {
        try {
            await this.customerService.getAllCustomers().then(data => {
                res.json(new Response("All Customers", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getCustomer = async (req, res) => {
        try {
            await this.customerService.getCustomer(req.params.customerid).then(data => {
                res.json(new Response("Customer found", data));
            }).catch(err => {
                console.log(err)
                res.status(400).json(new Response(err, "", false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    deleteCustomer = async (req, res) => {
        try {
            await this.customerService.deleteCustomer(req.params.customerid).then(data => {
                res.json(new Response("Customer deleted"));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }
}