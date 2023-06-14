export default async function ajaxLogin(loginData) {
  try {
    await fetch('http://dev.roadmap.com/api/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    })
      .then((respose) => {
        if (respose.ok) {
          return respose.json()
        }
        throw new Error('error')
      })
      .then((data) => {
        if (data.status) {
          localStorage.setItem('token', data.status)
          // navigate('/')
        } else {
          //set error
        }
      })
  } catch (error) {
    console.log(error.message)
  }
}
