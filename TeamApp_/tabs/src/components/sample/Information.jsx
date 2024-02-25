import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from 'react-router-dom';
import "./Publish.css";
import { Mymenu } from "./Menu";

export function Information() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedCompany = JSON.parse(decodeURIComponent(searchParams.get('selectedCompany')));
    const [companyData, setCompanyData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [nameCompany, setNameCompany] = useState("");
    const [descriptionCompany, setDescriptionCompany] = useState("");
    const url = `http://localhost:8000/api/getName/${selectedCompany.name_company}`;
    const url_supp = `http://localhost:8000/api/deleteCompany/${selectedCompany.name_company}`;
    const url_upd = `http://localhost:8000/api/update/${selectedCompany._id}`;
    const history = useHistory();
    const token = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/)[2];

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();
            setCompanyData(result);
        }
        fetchData();
    }, [url]);

    const handleDelete = async () => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette entreprise ?");
        if (!confirmed) {
            return;
        }

        const response = await fetch(url_supp, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log("Entreprise supprimée");
            alert("L'entreprise a été supprimé, vous allez être redirigé vers la page d'accueil !");
            history.push("/tab/accueil");
        } else {
            console.error("Erreur lors de la suppression de l'entreprise :", response.status);
            alert("Votre entreprise n'a pas pu être supprimé pour des raisons diverses");
        }
    };

    const handleHomeClick = () => {
        history.push('/tab/accueil');
    };

    const handleEdit = () => {
        setIsEditing(true);
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();
            setCompanyData(result);
        }
        fetchData();
    }, [url]);

    const handleUpdate = async () => {
        const response = await fetch(url_upd, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name_company: nameCompany || selectedCompany.name_company,
                description_company: descriptionCompany || selectedCompany.description_company
            })
        });
        if (response.ok) {
            console.log("Entreprise modifiée");
            alert("L'entreprise a été modifié !");
            history.push(`/tab/information?selectedCompany=${encodeURIComponent(JSON.stringify(selectedCompany))}`);
        } else {
            console.error("Erreur lors de la modification de l'entreprise :", response.status);
            alert("Votre entreprise n'a pas pu être modifiée pour des raisons diverses");
        }
        window.location.reload();
    };

    const handleNameChange = (event) => {
        setNameCompany(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescriptionCompany(event.target.value);
    }

    return (
        <div className="information">
            <div className="profil">
                <button className="home" onClick={handleHomeClick}> <img src="icon-home.png" alt="Home Icon" /> </button>

                <input
                    type="text"
                    disabled={!isEditing}
                    value={isEditing ? nameCompany : companyData.name_company}
                    placeholder={companyData.name_company}
                    onChange={handleNameChange}
                />

                <textarea
                    name="description"
                    id="description"
                    disabled={!isEditing}
                    value={isEditing ? descriptionCompany : companyData.description_company}
                    placeholder={companyData.description_company}
                    onChange={handleDescriptionChange}
                ></textarea>

                {isEditing ?
                    <div className="btnopt">
                        <button id="save" onClick={handleUpdate}> <img src="icon-save-white.png" alt="Save Icon" /> </button><br /><br />
                        <button id="cancel" onClick={() => setIsEditing(false)}> <img src="icon-back-white.png" alt="Cancel Icon" /> </button>
                    </div>
                    :
                    <div className="btnopt">
                        <button id="supp" onClick={handleDelete}> <img src="icon-trash-white.png" alt="Trash white Icon" /> </button><br /><br />
                        <button id="upd" onClick={handleEdit}> <img src="icon-update-white.png" alt="Update white Icon" /> </button>
                    </div>
                }
            </div>

            <Mymenu companyData={companyData} />
        </div>
    );
}