import { CustomerService } from "../services/customerService"


const newCustomer = {
                        firstName: "Christian",
                        lastName: "Onyeneke",
                        email: "onyenekechristian@gmail.com",
                        phoneNumber: "08171982530"
                    }

export const seedCustomer = async () => {
    const customerService = new CustomerService()
    // check if customer table is empty
    let existingCustomers = await customerService.getAllCustomers()
    if (existingCustomers.length == 0)
    {
        customerService.createCustomer(newCustomer);
        console.log("Customer data seeded!")
    }
}