import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export function Maintenance(props) {

    const { companyData } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [maintenanceIndex, setMaintenanceIndex] = useState(-1);
    const [nameMaintenance, setNameMaintenance] = useState("");
    const [descriptionMaintenance, setDescriptionMaintenance] = useState("");
    const [icon, setIcon] = useState('icon-add-empty.png');
    const [addMaintenance, setAddMaintenance] = useState(false);
    const history = useHistory();
    const token = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/)[2];

    const handleAddClick = () => {
        setAddMaintenance(true);
    };

    const handleAddClose = () => {
        setAddMaintenance(false);
    };

    const handleAddMaintenance = async (event) => {
        event.preventDefault();

        const formData = new FormData(document.getElementById('addMaintenanceForm'));

        const newMaintenance = {
            name_maintenance: formData.get('name_maintenance'),
            description_maintenance: formData.get('description_maintenance')
        };

        try {
            const response = await fetch(`http://localhost:8000/api/postMaintenance/${companyData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newMaintenance)
            });
            if (response.ok) {
                console.log('Nouvelle maintenance ajoutée avec succès');
                alert("La nouvelle maintenance a été ajoutée avec succès !");
                redirectToInformationPage(companyData);
            } else {
                console.log(formData);
                console.error("Erreur lors de l'ajout de la nouvelle maintenance");
            }
        } catch (error) {
            console.error('Erreur lors de la requête', error);
        };
    };

    const redirectToInformationPage = (companyData) => {
        const encodedCompanyData = encodeURIComponent(JSON.stringify(companyData));
        history.push(`/tab/information?selectedCompany=${encodedCompanyData}`);
        window.location.reload();
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette maintenance ?");
        // console.log(maintenanceIndex);
        if (!confirmed) {
            return;
        }

        const response = await fetch(`http://localhost:8000/api/deleteMaintenance/${companyData.maintenance[maintenanceIndex]._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log("Maintenance supprimée");
            alert("La maintenance a été supprimée, vous allez être redirigé vers la page d'accueil des informations de l'entreprise !");
            const encodedCompanyData = encodeURIComponent(JSON.stringify(companyData));
            window.location.href = `/tab/information?selectedCompany=${encodedCompanyData}&selectedMenuItem=maintenance`;
            window.location.reload();
        } else {
            console.error("Erreur lors de la suppression de la maintenance :", response.status);
            alert("Votre maintenance n'a pas pu être supprimée pour des raisons diverses");
        }
    };

    const handleMouseEnter = () => {
        setIcon('icon-add.png');
    }

    const handleMouseLeave = () => {
        setIcon('icon-add-empty.png');
    }

    useEffect(() => {
        // console.log("isEditing after update", isEditing);
    }, [isEditing]);

    const handleEdit = (index) => {
        setIsEditing(true);
        setMaintenanceIndex(index);
    }

    useEffect(() => {
        // console.log("maintenanceIndex after update", maintenanceIndex);
    }, [maintenanceIndex]);

    const handleUpdate = async () => {
        const response = await fetch(`http://localhost:8000/api/updateMaintenance/${companyData.maintenance[maintenanceIndex]._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name_maintenance: nameMaintenance || companyData.maintenance[maintenanceIndex].name_maintenance,
                description_maintenance: descriptionMaintenance || companyData.maintenance[maintenanceIndex].description_maintenance
            })
        });
        if (response.ok) {
            console.log("Maintenance modifiée");
            alert("La maintenance a été modifié !");
            history.push(`/tab/information?selectedCompany=${encodeURIComponent(JSON.stringify(companyData))}`);
        } else {
            console.error("Erreur lors de la modification de la maintenance :", response.status);
            alert("Votre maintenance n'a pas pu être modifiée pour des raisons diverses");
        }
        window.location.reload();
    };

    const handleNameChange = (event) => {
        setNameMaintenance(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescriptionMaintenance(event.target.value);
    }

    return (
        <div className="maintenance">
            <div className="textzone">

                {addMaintenance ? (
                    <>
                        {companyData.maintenance.map((maintenance, index) => (
                            <div className="site" key={index}>
                                <input
                                    type="text"
                                    disabled={maintenanceIndex !== index}
                                    value={maintenanceIndex === index ? nameMaintenance : maintenance.name_maintenance}
                                    placeholder={maintenance.name_maintenance}
                                    onChange={handleNameChange}
                                />

                                <textarea
                                    name="site-maintenance"
                                    id="site"
                                    disabled={maintenanceIndex !== index}
                                    value={maintenanceIndex === index ? descriptionMaintenance : maintenance.description_maintenance}
                                    placeholder={maintenance.description_maintenance}
                                    onChange={handleDescriptionChange}
                                ></textarea>

                                {maintenanceIndex === index && (
                                    <div className="button">
                                        <button id="btn_annuler" onClick={() => setMaintenanceIndex(-1)}>
                                            Annuler <img src="icon-back.png" alt="Back Icon" />
                                        </button>
                                        <button id="btn_enregistrer" onClick={handleUpdate}>
                                            Enregistrer <img src="icon-save-purple.png" alt="Save Icon" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="site">
                            <form method="POST" id="addMaintenanceForm" onSubmit={handleAddMaintenance}>
                                <input type="text" name="name_maintenance" placeholder="Site Web" />

                                <textarea name="description_maintenance" placeholder="Ex. Voici une description de la maintenance faite par Site Web."></textarea>

                                <div className="button">
                                    <button id="btn_add" type="submit">
                                        Ajouter <img src="icon-plus-purple.png" alt="Add Icon" />
                                    </button>
                                    <button id="btn_annuler" onClick={handleAddClose}>
                                        Annuler <img src="icon-back.png" alt="Back Icon" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                ) : (
                    <>
                        {companyData.maintenance.map((maintenance, index) => (
                            <div className="site" key={index}>
                                <input
                                    type="text"
                                    disabled={maintenanceIndex !== index}
                                    value={maintenanceIndex === index ? nameMaintenance : maintenance.name_maintenance}
                                    placeholder={maintenance.name_maintenance}
                                    onChange={handleNameChange}
                                />

                                <textarea
                                    name="site-maintenance"
                                    id="site"
                                    disabled={maintenanceIndex !== index}
                                    value={maintenanceIndex === index ? descriptionMaintenance : maintenance.description_maintenance}
                                    placeholder={maintenance.description_maintenance}
                                    onChange={handleDescriptionChange}
                                ></textarea>

                                {maintenanceIndex === index && (
                                    <div className="button_maintenance">
                                        <button id="btn_annuler" onClick={() => setMaintenanceIndex(-1)}>
                                            <img src="icon-back.png" alt="Back Icon" />
                                        </button>
                                        <button id="btn_enregistrer" onClick={handleUpdate}>
                                            <img src="icon-save-purple.png" alt="Save Icon" />
                                        </button>
                                        {companyData.maintenance.length > 1 ? (
                                            <button id="btn_supp" onClick={handleDelete}>
                                                <img src="icon-trash.png" alt="Purple update Icon" />
                                            </button>
                                        ) : null}
                                    </div>
                                )}

                                {maintenanceIndex !== index && (
                                    <div className="button">
                                        <button id="btn_edit" onClick={() => handleEdit(index)}>
                                            Modifier <img src="icon-update-purple.png" alt="Purple update Icon" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </div>

            {companyData.maintenance.length < 2 ? (
                <button>
                    <img src={icon} alt="Add icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleAddClick} />
                </button>
            ) : null}

        </div>
    );
}