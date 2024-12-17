/*
Task 1.2 - Sort sales data by total

Assumptions:
    1. Input sales data array contains sales objects with amount and quantity properties.
    2. amount and quantity values are positive numbers.
    3. Sort with descending order - highest total to lowest total
*/

function sortSalesByTotal(salesData) {

    // Validate input sales data array
    if (!Array.isArray(salesData)) {
        throw new Error("SalesData Input must be an array");
    }
    if (salesData.length === 0) {
        return [];
    }

    const salesWithTotal = salesData.map(sale => {

        // Validate sale data object structure
        if (!sale || typeof sale !== 'object') {
            throw new Error("Each sale data must be an object");
        }
        if (typeof sale.amount !== 'number' || typeof sale.quantity !== 'number') {
            throw new Error("Sale data objects must have numeric amount and quantity");
        }

        return {
            ...sale,
            Total: sale.amount * sale.quantity
        };
    });

    // Sort by Total in descending order
    return salesWithTotal.sort((a, b) => b.Total - a.Total);

}

/*
    Test function to verify the sortSalesByTotal implementation
    Test scenarios:
        - Regualar test with correct data
        - Is an array test
        - Is empty array test
        - Is each sales data is an object test
        - Test amount and quanity are numbers
 */

function runTestsOfSortSalesFunc() {

    // Regular test with correct data
    const sales = [
        { amount: 5000, quantity: 15 }, // Total: 75000
        { amount: 10000, quantity: 10 }, // Total: 100000  
        { amount: 8000, quantity: 12 }  // Total: 96000
    ];
    const result = sortSalesByTotal(sales);
    console.log("Regular test with correct data :", result);

    // Is an array test
    console.log("\nIs an array test");
    try {
        sortSalesByTotal({});
    } catch (error) {
        console.log("Error Message  :", error.message);
    }
    
    // Is empty array test
    console.log("\nEmpty array test :", sortSalesByTotal([])); // output: []
    
    // Is each sales data is an object test
    console.log("\nIs each sales data is an object test");
    try {
        sortSalesByTotal([{ amount: 100, quantity: 2 }, "not an object"]);
    } catch (error) {
        console.log("Error Message  :", error.message);
    }
    
    // Test amount and quantity are numbers
    console.log("\nTest amount and quantity are numbers");
    try {
        sortSalesByTotal([{ amount: "100", quantity: 2 }]);
    } catch (error) {
        console.log("Error Message  :", error.message);
    }

    try {
        sortSalesByTotal([{ amount: 100, quantity: "2" }]);
    } catch (error) {
        console.log("Error Message  :", error.message);
    }
    
}

// Execute tests scenarios
runTestsOfSortSalesFunc();