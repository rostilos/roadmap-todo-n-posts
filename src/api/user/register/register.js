export default async function register(userData) {
  try {
    await fetch("http://dev.roadmap.com/api/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
      .then((respose) => {
        if (respose.ok) {
          return respose.json();
        }
        throw new Error("error");
      })
      .then((data) => {
        if (data.status) {
          localStorage.setItem("token", data.status);
          // navigate('/confirm')
        } else {
          //set error
        }
      });
  } catch (error) {
    console.log(error.message);
  }
}
