using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Access-Control-Expose-Headers", "Authorization, Application-Error");
            //Allow header was not used so get method was not working on Client coz he was not allowed to access that header
            response.Headers.Add("Access-Control-Allow-Headers", "Authorization, Application-Error");
            
            response.Headers.Add("Access-Control-Allow-Origin","*");
            response.Headers.Add("Application-Error",message);
            response.Headers.Add("Authorization","User is Autherized");

            //tries
            //response.Headers.Add("Access-Control-Expose-Header","Application-Error");
            //response.Headers.Add("Access-Control-Allow-Headers", "*");
            //response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

             //These headers are handling the "pre-flight" OPTIONS call sent by the browser
            // response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            // response.Headers.Add("Access-Control-Allow-Headers", "*");
            // response.Headers.Add("Access-Control-Allow-Credentials", "true");
            // response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:4200");
            // response.Headers.Add("Access-Control-Expose-Headers", "TestHeaderToExpose");
        }
    }
}