/*
Task 1.3 - Object Projection which Projects source object structure based on prototype object
 
Assumptions:
    1. As a input takes JSON objects (source and prototype).
    2. Handle nested objects.
    3. Prototype properties with null are included in projection.
 */

function projectObject(sourceObj, protoObj) {

    // Validate input data 
    if (!sourceObj || typeof sourceObj !== 'object') {
        throw new Error("Source must be a valid object");
    }
    if (!protoObj || typeof protoObj !== 'object') {
        throw new Error("Prototype must be a valid object");
    }

    function buildProjection(source, proto, result = {}) {
        for (const key in proto) {
            if (key in source) {
                // Handle nested objects - both must be objects and not null
                if (typeof proto[key] === 'object' && proto[key] !== null && 
                    typeof source[key] === 'object' && source[key] !== null) {
                    result[key] = {};
                    buildProjection(source[key], proto[key], result[key]);
                } else {
                    // Copy value from source object
                    result[key] = source[key];
                }
            }
        }
        return result;
    }
    
    return buildProjection(sourceObj, protoObj);
}

/*
    Test function to verify the projectObject implementation
    Tests scenarios:
       - Test functionality with data
       - Test input validations
*/

function runTestsOfProjectionFunc() {

    // Source and prototype object of assignment
    const source = {
        prop11: {
            prop21: 21,
            prop22: {
                prop31: 31,
                prop32: 32
            }
        },
        prop12: 12
    };

    const proto = {
        prop11: {
            prop22: null
        }
    };

    // Test functionality with data
    console.log("Test functionality with data :", projectObject(source, proto));

    //Test input validations
    console.log("\nTest input validations :");
    try {
        projectObject(null, {});
    } catch (error) {
        console.log("Error Message  :", error.message);
    }
    
}

// Execute tests scenarios
runTestsOfProjectionFunc();