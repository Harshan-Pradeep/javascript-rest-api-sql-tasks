/*
Task 2.1 - Google Calendar Free/Busy API Integration
Gets busy intervals for a Google Calendar in a specified time period
*/

/*
Class to handle Google Calendar API operations
Provides methods for initialization, authentication, and retrieving busy intervals
*/

class GoogleCalendarAPI {

    // Initialize Google Calendar API client
    constructor(apiKey, clientId) {
        this.apiKey = apiKey;
        this.clientId = clientId;
        this.isInitialized = false;
        this.SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
    }

    /*
    Initialize the Google API client library
    Loads required client libraries and initializes with API key
    */

    async init() {

        // Load the Google API client library
        await new Promise((resolve, reject) => {
            gapi.load('client', { callback: resolve, onerror: reject });
        });

        // Initialize the client with API key and discovery docs
        await gapi.client.init({
            apiKey: this.apiKey,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
        });

        this.isInitialized = true;
    }

    /*
    Authenticate user using OAuth2
    Requests access token for calendar readonly scope
    */

    async authenticate() {
        if (!this.isInitialized) throw new Error('API not initialized');

        return new Promise((resolve, reject) => {
            const client = google.accounts.oauth2.initTokenClient({
                client_id: this.clientId,
                scope: this.SCOPES,
                callback: (response) => {
                    response.error ? reject(response) : resolve(response);
                },
            });
            client.requestAccessToken();
        });
    }

    /*
    Gets busy time intervals for a specified calendar
    */
   
    async getBusyIntervals(calendarId, startTime, endTime) {

        // Input validation
        if (!this.isInitialized) throw new Error('API not initialized');
        if (!calendarId || typeof calendarId !== 'string') throw new Error('Valid calendar ID required');
        if (!(startTime instanceof Date) || !(endTime instanceof Date)) throw new Error('Valid dates required');
        if (startTime >= endTime) throw new Error('Start time must be before end time');

        // Prepare request for freebusy query
        const request = {
            resource: {
                timeMin: startTime.toISOString(),
                timeMax: endTime.toISOString(),
                items: [{ id: calendarId }]
            }
        };

        // Execute query and return busy intervals
        const response = await gapi.client.calendar.freebusy.query(request);
        return response.result.calendars[calendarId].busy || [];
    }
}

// API credentials configuration
const API_KEY = 'AIzaSyCyHaK3BHMI4_OVvbM7yazVbKkuzp1ybuk';
const CLIENT_ID = '1015988092270-5ib66koc6eia0i92gh8pvj8bivjindm5.apps.googleusercontent.com';

/*
Runs test suite for calendar API implementation
Test scenarios:
        - Tests initialization
        - Test authentication
        - Test input validation
        - Test API calls
*/

async function runTests() {
    const calendar = new GoogleCalendarAPI(API_KEY, CLIENT_ID);

    try {
        // Initialize and authenticate
        await calendar.init();
        await calendar.authenticate();

        // Test input validation
        try {
            await calendar.getBusyIntervals('', new Date(), new Date());
        } catch (error) {
            console.log('Validation test passed:', error.message);
        }

        // Test API functionality with 7-day range
        const startTime = new Date();
        const endTime = new Date(startTime.getTime() + (7 * 24 * 60 * 60 * 1000));
        const busyIntervals = await calendar.getBusyIntervals('primary', startTime, endTime);
        console.log('Busy intervals:', busyIntervals);

    } catch (error) {
        console.error('Test failed:', error);
    }
}

// Start tests when page loads
window.addEventListener('load', runTests);