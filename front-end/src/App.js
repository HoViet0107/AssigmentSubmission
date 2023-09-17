import "./App.scss";

function App() {
  const reqBody = {
    username: "hoviet",
    password: "123456",
  };
  fetch("api/auth/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(reqBody),
  })
    .then((response) => Promise.all([response.json(), response.headers]))
    .then(([body, headers]) => {
      console.log(headers.get("authorization"));
      console.log(body);
    });
  return <div className="App">Hello</div>;
}

export default App;
