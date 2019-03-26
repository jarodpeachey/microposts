class PeachHTTP {
   async get(url) {
      const response = await fetch(url);
      const responseData = await response.json();
      return responseData;
   }

   async post(url, userData) {
      const response = await fetch(url, {
         method: `POST`,
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify(userData)
      });

      const responseData = await response.json();
      return responseData;
   }

   async put(url, userData) {
      const response = await fetch(url, {
         method: `PUT`,
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify(userData)
      });

      const responseData = await response.json();
      return responseData;
   }

   async delete(url) {
      const response = await fetch(url, {
         method: `DELETE`,
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify(userData)
      });

      const responseData = await 'Resource deleted succesfully';
      return responseData;
   }
}

export const http = new PeachHTTP();