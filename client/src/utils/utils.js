const sendData = async (data, endpoint) => { 
    try {
      const response = await fetch(endpoint, {
        method: "POST", // or 'GET' or any other HTTP method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        return { success: true, response: responseData };
      } else {
        const errorData = await response.json();
        return { success: false, response: errorData };
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error sending data:", error);
      return { success: false, response: { error: "Network error" } };
    }
  }
export default sendData;