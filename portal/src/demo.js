// JSON data
const history = [
    {
      "action": "Sign In",
      "timestamp": "2024-11-06T12:12:00.481Z",
      "_id": "672b5d10225f7d0289bc0430"
    },
    {
      "action": "Sign Out",
      "timestamp": "2024-11-06T12:12:05.219Z",
      "_id": "672b5d15225f7d0289bc0438"
    },
    {
      "action": "Sign In",
      "timestamp": "2024-11-06T12:21:27.083Z",
      "_id": "672b5f47b5583cc279d76ad6"
    },
    {
      "action": "Sign Out",
      "timestamp": "2024-11-06T12:49:30.576Z",
      "_id": "672b65dab5583cc279d76b0c"
    }
  ];
  
  // Function to calculate time difference
  function calculateTimeDifferences(history) {
    for (let i = 0; i < history.length; i += 2) {
      // Ensure each pair is "Sign In" followed by "Sign Out"
      const signIn = history[i];
      const signOut = history[i + 1];
  
      if (signIn && signOut && signIn.action === "Sign In" && signOut.action === "Sign Out") {
        const date1 = new Date(signIn.timestamp);
        const date2 = new Date(signOut.timestamp);
        
        
  
        // Calculate the difference in milliseconds
        const differenceInMilliseconds = date2 - date1;
  
        // Convert milliseconds to hours, minutes, seconds, and milliseconds
        const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);
        const milliseconds = differenceInMilliseconds % 1000;
  
  console.log("--------------------------------  **  -----------------------------");
  
        // Display result for each pair
        console.log(`Time difference between Sign In (ID: ${signIn._id}) and Sign Out (ID: ${signOut._id}):`);
        console.log(`${hours} hours, ${minutes} minutes, ${seconds} seconds, ${milliseconds} milliseconds`);
      }
    }
  }
  
  // Call the function
  calculateTimeDifferences(history);
  