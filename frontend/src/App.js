import React from 'react';
import './style/app.css'
import { useState  } from 'react';
import Test from './test'

function App() {// Create state and update state function for each form element 
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [article, setArticle] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(password);
    fetch('http://localhost:5000/api/auth/signin', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({// Post with each form element value
          nom,
          prenom,
          email,
          password
      })
  })

  .then(res => res.json())

  .then(data => {// After succes Post clear all form element state and add userId and token to state
    setUserId(data.userId);
    setNom("");
    setPrenom("");
    setEmail("");
    setPassword("");
    setToken(data.token);
  })
  console.log(token);
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();

    console.log(password);
    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({// Post with each form element value
          email,
          password
      })
  })

  .then(res => res.json())

  .then(data => {// After succes Post clear all form element state and add userId and token to state
    setUserId(data.userId);
    setEmail("");
    setPassword("");
    setToken(data.token);
  })
  console.log(token);
  };

  
  // const test = () => {
  //   console.log(userId);
  //   return <p>{userId}</p>
  //   fetch('http://localhost:5000/api/getall')
  //     .then(result => result.json())
  //     .then(data => {
  //       setArticle([data.result]);
  //       console.log(article);
  //       console.log(data);
  //       return <div>{data.result.map((art) => (
  //         <p key={art.id}>{art.texte_article}</p>
  //       ))}</div>
  //     })
  //   return <p>{userId}</p>
  // }

  return (
    !token ? (
      <div>
        <h1>
          Inscrivez vous !
        </h1>
        <form id="signin-form" onSubmit={handleSubmit}>
          <label htmlFor="prenom">Prenom</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)} />

          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}/>
            
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>

          <label htmlFor="password">Mot de passe</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>

          <button >Envoyer</button>
        </form>
        <form onSubmit={handleSubmit1}>
          <h2>Deja inscrit</h2>
          <label htmlFor="email1">Email</label>
          <input
            type="text"
            id="email1"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          
          <label htmlFor="password1">Mot de passe</label>
          <input
            type="text"
            id="password1"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
            <button>Envoyer</button>
        </form>
      </div>
    ) : <Test userId={userId} token={token} />
  )
}


export default App;
