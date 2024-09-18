async function authme() 
{
  const token = localStorage.getItem('authToken');
  console.log("Token:",token);
  const retoken = localStorage.getItem('refreshToken');
  console.log("Refresh Token:", retoken);

  try{
    const response = await fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, 
      }, 
    });

    const data = await response.json();

    if(response.ok)
    {
      console.log(data);
      let name = document.getElementById("nameUser");
      name.childNodes[0].nodeValue = data.firstName + " " + data.lastName;
      
      let image = document.getElementById("imageUser");
      image.src = data.image;
      image.style.width = "40px";
      image.style.height = "40px";
    }
    else 
    {
      console.log("ERROR");
      window.location.assign("index.html");
      localStorage.clear(); 
      
    }
  }
  catch(error){
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
}




  
  




