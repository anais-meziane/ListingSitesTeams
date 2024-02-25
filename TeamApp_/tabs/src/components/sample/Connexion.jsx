import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export function Connexion() {

    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [newUser, setNewUser] = useState(false);

    const AddNewUser = () => {
        setNewUser(true);
    };

    const backConnexion = () => {
        setNewUser(false);
    };

    const handleFormConnect = async (event) => {
        event.preventDefault();

        const formData = new FormData(document.getElementById('connectForm'));

        const user = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('http://localhost:8000/apiConnect/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const responseBody = await response.text();
            const match = responseBody.match(/"token":"([^"]+)/);
            const token = match ? match[1] : null;
            // console.log(token);

            if (response.ok) {
                document.cookie = `token=${token}; SameSite=None; Secure`;
                // console.log(document.cookie);
                console.log('Vous êtes connectés');
                history.push('/tab/accueil')
                // window.location.reload();
            } else {
                console.log(formData)
                console.error("Erreur lors de la connection")
                alert("Le nom d'utilisateur ou le mot de passe est erroné")
            }
        } catch (error) {
            console.error('Erreur lors de la requête', error)
        }
    };

    const handleFormAdd = async (event) => {
        event.preventDefault();

        const formData = new FormData(document.getElementById('newUserForm'));

        const password = formData.get('password');
        const verif = formData.get('verif');

        const user = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            if (password === verif) {
                const response = await fetch('http://localhost:8000/apiConnect/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })

                if (response.ok) {
                    console.log("Votre inscription a bien été prise en compte")
                    alert("Votre inscription a bien été prise en compte, vous allez pouvoir vous connecter")
                    window.location.reload();
                } else {
                    console.log(formData)
                    console.error("Erreur lors de l'inscription")
                    alert("Votre inscription n'a pas pu être prise en compte, veuillez réitérer l'opération à nouveau")
                }
            } else {
                alert("Les mots de passe ne sont pas identiques")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="connectPage">

            {newUser ? (
                <form id="newUserForm" method="POST" onSubmit={handleFormAdd}>
                    <h1>Inscrivez vous !</h1>

                    <div className="inscription">
                        <div className="col1">
                            <div className="inputBox">
                                <input type="text" name="name" required />
                                <span>Nom</span>
                            </div>

                            <div className="inputBox">
                                <input type="text" name="email" required />
                                <span>E-mail</span>
                            </div>
                        </div>

                        <div className="col2">
                            <div className="inputBox">
                                <input type="text" name="password" required />
                                <span>Mot de passe</span>
                            </div>

                            <div className="inputBox">
                                <input type="text" name="verif" required />
                                <span>Encore une fois...</span>
                            </div>
                        </div>
                    </div>

                    <div className="btn_connect">
                        <button type="submit">S'inscrire</button>
                        <button type="button" onClick={backConnexion}>Retour</button>
                    </div>
                </form>
            ) : (
                <form id="connectForm" method="POST" onSubmit={handleFormConnect}>
                    <h1>Connectez vous !</h1>

                    <div className="connect">

                        <div className="inputBox">
                            <input type="text" name="email" required />
                            <span>E-mail</span>
                        </div>

                        <div className="inputBox">
                            <input type={showPassword ? "text" : "password"} name="password" required />
                            <span>Mot de passe</span>
                            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <img src="icon-close-eye.png" alt="Close eye Icon" /> : <img src="icon-open-eye.png" alt="Open eye Icon" />}
                            </button>
                        </div>

                    </div>

                    <div className="btn_connect">
                        <button type="submit">Suivant</button>
                        {/* <button id="mdp">Mot de passe oublié ?</button> */}
                        <button type="button" id="inscription" onClick={AddNewUser}>S'inscrire</button>
                    </div>

                </form>
            )}
        </div>
    )
}