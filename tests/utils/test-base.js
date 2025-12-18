const base=require('@playwright/test');

exports.customtest=base.test.extend(
{
    testDataForOrder:
    {
    username:"abiqa@gmail.com",
   password:"Qwerty@123",
    productName: "ZARA COAT 3"  
    }
}
)