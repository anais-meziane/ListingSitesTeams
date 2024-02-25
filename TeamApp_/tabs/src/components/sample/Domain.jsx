import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export function Domain(props) {

    const { companyData } = props;
    const [activeDomainId, setActiveDomainId] = useState("bla");
    const [domainData, setDomainData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingDomain, setIsEditingDomain] = useState(false);
    const [nameExtension, setNameExtension] = useState("");
    const [nameDomain, setNameDomain] = useState("");
    const [nameDomainEdit, setNameDomainEdit] = useState("");
    const [Tags, setTags] = useState("");
    const [activity, setActivity] = useState('non-actif');
    const [checkedIndexes, setCheckedIndexes] = useState({
        google: false,
        yahoo: false,
        bing: false
    });
    const history = useHistory();
    const url = `http://localhost:8000/api/getdomain/${props.domainId}`;
    const url_supp_domain = `http://localhost:8000/api/deleteDomain/${props.domainId}`;
    const url_supp_ext = `http://localhost:8000/api/deleteExtension/${activeDomainId}`;

    useEffect(() => {
        const token = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/)[2];

        async function fetchData() {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();
            setDomainData(result);
            setIsLoading(false);
        }
        fetchData();
    }, [url]);

    const handleSelectChange = (event) => {
        setActiveDomainId(event.target.value);
    };

    if (isLoading || !domainData) {
        return <div>Loading...</div>;
    }

    const selectedExtension = domainData?.domainName[0]?.extensions?.find(extension => extension._id === activeDomainId);

    const handleEditClick = () => {
        setIsEditing(true);
        setNameExtension(selectedExtension.name_extension);
    };

    const handleEditDomainClick = () => {
        setIsEditingDomain(true);
    };

    const handleAddExtensionSubmit = async (event) => {
        event.preventDefault();

        // Traitement des données
        const formData = new FormData(document.getElementById('addExtensionForm')); // Récupération des données dans le formulaire

        const newExtensions = {
            name_extension: formData.get('name_extension'),
            googleIndex: formData.get('googleIndex') ? formData.get('googleIndex') === 'on' : false,
            yahooIndex: formData.get('yahooIndex') ? formData.get('yahooIndex') === 'on' : false,
            bingIndex: formData.get('bingIndex') ? formData.get('bingIndex') === 'on' : false,
        };

        const token = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/)[2];

        try {
            const response = await fetch(`http://localhost:8000/api/postExtension/${companyData._id}/${domainData.domainName[0].name_domain}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newExtensions)
            });
            if (response.ok) {
                console.log('Nouvelle extension ajouté avec succès');
                alert("La nouvelle extension a été ajouté avec succès !");
                redirectToInformationPage(companyData);
            } else {
                console.log(formData);
                console.error("Erreur lors de l'ajout de la nouvelle extension");
            }
        } catch (error) {
            console.error('Erreur lors de la requête', error);
        };
        window.location.reload();
    };

    const redirectToInformationPage = (companyData) => {
        const encodedCompanyData = encodeURIComponent(JSON.stringify(companyData));
        history.push(`/tab/information?selectedCompany=${encodedCompanyData}`);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setIsEditingDomain(false);
    }

    const handleSaveEdit = async () => {
        const token = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/)[2];

        const response = await fetch(`http://localhost:8000/api/updateDomain/${selectedExtension._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name_extension: nameExtension,
                googleIndex: !!checkedIndexes.google,
                yahooIndex: !!checkedIndexes.yahoo,
                bingIndex: !!checkedIndexes.bing
            })
        });
        if (response.ok) {
            console.log("Domaine modifié");
            alert("Le domaine a été modifié !");
            history.push(`/tab/information?selectedCompany=${encodeURIComponent(JSON.stringify(companyData))}`);
            window.location.reload();
        } else {
            console.error("Erreur lors de la modification du domaine :", response.status);
            alert("Votre domaine n'a pas pu être modifié pour des raisons diverses");
        }
    };

    const handleNameDomainChange = (event) => {
        const value = event.target.value;
        setNameDomainEdit(value);
    };

    const handleNameChange = (event) => {
        const value = event.target.value;
        setNameExtension(value);
    };

    const handleGoogleIndexChange = (event) => {
        event.persist();
        setCheckedIndexes((prevState) => ({
            ...prevState,
            google: event.target.checked
        }));
        console.log(event.target.checked);
    };

    const handleYahooIndexChange = (event) => {
        event.persist();
        setCheckedIndexes((prevState) => ({
            ...prevState,
            yahoo: event.target.checked
        }));
        console.log(event.target.checked);
    };

    const handleBingIndexChange = (event) => {
        event.persist();
        setCheckedIndexes((prevState) => ({
            ...prevState,
            bing: event.target.checked
        }));
        console.log(event.target.checked);
    };

    const handleDeleteDomain = async () => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer le domaine en entier ?");
        if (!confirmed) {
            return;
        }
        if (companyData.domainName.length < 2) {
            alert("Vous ne pouvez pas supprimer le domaine principal");
            return;
        }

        const response = await fetch(url_supp_domain, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });

        const token = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/)[2];

        if (response.ok) {
            console.log("Domaine supprimée");
            alert("Le domaine a été supprimé !");
            history.push(`/tab/information?selectedCompany=${encodeURIComponent(JSON.stringify(companyData))}`);
        } else {
            console.error("Erreur lors de la suppression du domaine :", response.status);
            alert("Votre domaine n'a pas pu être supprimé pour des raisons diverses");
        }
        window.location.reload();
    }

    const handleDeleteExtension = async () => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer l'extension de ce domaine ?");
        if (!confirmed) {
            return;
        }
        if (domainData.domainName[0].extensions.length < 2) {
            alert("Vous ne pouvez pas supprimer l'extension principale");
            return;
        }

        const token = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/)[2];

        const response = await fetch(url_supp_ext, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log("Extension supprimée");
            alert("L'extension a été supprimée !");
            history.push(`/tab/information?selectedCompany=${encodeURIComponent(JSON.stringify(companyData))}`);
            window.location.reload();
        } else {
            console.error("Erreur lors de la suppression de l'extension :", response.status);
            alert("Votre extension n'a pas pu être supprimée pour des raisons diverses");
        }
    }

    const handleEditDomain = async (event) => {
        event.preventDefault();

        const formData = new FormData(document.getElementById('edit_domain'));

        const tags = formData.get('tags');
        const tags_array = tags ? tags.split(',') : [];

        const activity = document.querySelector('input[name="activity"]').checked ? 'actif' : 'non-actif';

        const token = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/)[2];

        const response = await fetch(`http://localhost:8000/api/editDomain/${domainData.domainName[0]._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                activity: activity,
                tags: tags_array,
                name_domain: formData.get('name_domain')
            })
        });

        if (response.ok) {
            console.log('Données du domaine modifiées avec succès');
            alert("Les données du domaine ont été modifiée avec succès !")
            history.push(`/tab/information?selectedCompany=${encodeURIComponent(JSON.stringify(companyData))}`)
            window.location.reload();
        } else {
            console.error("Erreur lors de la modification des données du domain :", response.status);
            alert("Les données du domaine n'ont pas pu être modifiées pour des raisons diverses.")
        }
    }


    return (
        <div className="domain-content">
            <select name="extension" id="extension" onChange={handleSelectChange}>
                <option value="bla">Extensions</option>
                {domainData.domainName[0].extensions.map((extension) => (
                    <option key={extension._id} value={extension._id}>
                        {extension.name_extension}
                    </option>
                ))}
                <option value="new">Nouvelle extension</option>
            </select>

            {selectedExtension &&
                <>
                    {isEditing ?
                        <>
                            <h1>Modification de {selectedExtension.name_extension}</h1>
                            <input
                                type="text"
                                name="name_extension"
                                value={selectedExtension.name_extension ? nameExtension : selectedExtension.name_extension}
                                onChange={handleNameChange}
                                placeholder={selectedExtension.name_extension}
                            />
                            <h1>Indexes</h1>
                            <div className="index">
                                <div className="google">
                                    <img src="icon-google.png" alt="Google Icon" />
                                    <label id="google" className="switch">
                                        <input
                                            type="checkbox"
                                            name="googleIndex"
                                            onChange={handleGoogleIndexChange}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>

                                <div className="yahoo">
                                    <img src="icon-yahoo.png" alt="Yahoo Icon" />
                                    <label id="yahoo" className="switch">
                                        <input type="checkbox"
                                            name="yahooIndex"
                                            onChange={handleYahooIndexChange}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>

                                <div className="bing">
                                    <img src="icon-bing.png" alt="Bing Icon" />
                                    <label id="bing" className="switch">
                                        <input type="checkbox"
                                            name="bingIndex"
                                            onChange={handleBingIndexChange}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="barre"></div>
                        </>
                        :
                        <>
                            <h1>Indexes</h1>
                            <div className="index">
                                <div className="google">
                                    <img src="icon-google.png" alt="Google Icon" />
                                    <label id="google" className="switch">
                                        <input type="checkbox" checked={selectedExtension.googleIndex} />
                                        <span className="slider round"></span>
                                    </label>

                                </div>

                                <div className="yahoo">
                                    <img src="icon-yahoo.png" alt="Yahoo Icon" />
                                    <label id="yahoo" className="switch">
                                        <input type="checkbox" checked={selectedExtension.yahooIndex} />
                                        <span className="slider round"></span>
                                    </label>

                                </div>

                                <div className="bing">
                                    <img src="icon-bing.png" alt="Bing Icon" />
                                    <label id="bing" className="switch">
                                        <input type="checkbox" checked={selectedExtension.bingIndex} />
                                        <span className="slider round"></span>
                                    </label>

                                </div>
                            </div>
                            <div className="barre"></div>
                        </>
                    }
                </>
            }

            {activeDomainId === "new" &&
                (
                    <div className="addExtension">
                        <h1>Ajouter une nouvelle extension à {domainData.domainName[0].name_domain}</h1>

                        <form method="POST" id="addExtensionForm" onSubmit={handleAddExtensionSubmit}>
                            <label>
                                <b>Nouvelle extension du domaine :</b>
                                <input type="text" name="name_extension" placeholder="Ex. org" required />
                            </label>

                            <div className="checkdiv">
                                <label className="check">
                                    <img src="icon-google.png" alt="Google Icon" />
                                    <input type="checkbox" name="googleIndex" />
                                </label>

                                <label className="check">
                                    <img src="icon-yahoo.png" alt="Yahoo Icon" />
                                    <input type="checkbox" name="yahooIndex" />
                                </label>

                                <label className="check">
                                    <img src="icon-bing.png" alt="Bing Icon" />
                                    <input type="checkbox" name="bingIndex" />
                                </label>
                            </div>

                            <button type="submit">Ajouter</button>
                        </form>
                    </div>
                )
            }{domainData?.domainName[0]?.tags && activeDomainId != "new" && activeDomainId != "bla" && (
                <>
                    <h1>Tags</h1>
                    <div className="tag">
                        <p>{domainData.domainName[0].tags[0]}</p>
                        <p>{domainData.domainName[0].tags[1]}</p>
                        <p>{domainData.domainName[0].tags[2]}</p>
                        <p>{domainData.domainName[0].tags[3]}</p>
                        <p>{domainData.domainName[0].tags[4]}</p>
                    </div>
                    <div className="barre"></div>
                </>
            )}

            {activeDomainId != "new" && activeDomainId != "bla" && (
                <div className="activite">
                    <h1>Actif</h1>
                    <label id="activite" className="switch">
                        <input type="checkbox" checked={domainData.activity === 'actif' ? true : false} />
                        <span className="slider round"></span>
                    </label>
                </div>
            )}

            {activeDomainId != "bla" && activeDomainId != "new" ? (
                <div className="button">
                    {!isEditing ? (
                        <>
                            <button id="btn_upd" onClick={handleEditClick}>
                                Modifier <img src="icon-update-purple.png" alt="Purple update Icon" />
                            </button>
                            <button id="btn_trash" onClick={handleDeleteExtension}>
                                Supprimer <img src="icon-trash.png" alt="Trash Icon" />
                            </button>
                        </>
                    ) : (
                        <>
                            <button id="btn_save" onClick={handleSaveEdit}>
                                Enregistrer <img src="icon-save-purple.png" alt="Purple save Icon" />
                            </button>
                            <button id="btn_cancel" onClick={handleCancelEdit}>
                                Annuler <img src="icon-back.png" alt="Return Icon" />
                            </button>
                        </>
                    )}
                </div>
            ) : null}

            {activeDomainId === "bla" && (
                <>
                    {isEditingDomain ? (
                        <form method="PATCH" id="edit_domain" onSubmit={handleEditDomain}>
                            <h1>Modification de {domainData.domainName[0].name_domain}</h1>
                            <input
                                type="text"
                                name="name_domain"
                                placeholder={domainData.domainName[0].name_domain}
                                required
                            />

                            <h1>Tags</h1>
                            <div className="tag">
                                <input
                                    type="text"
                                    name="tags"
                                    placeholder={domainData.domainName[0].tags}
                                    required
                                />
                            </div>
                            <div className="barre"></div>

                            <div className="activite">
                                <h1>Actif</h1>
                                <label id="activite" className="switch">
                                    <input type="checkbox" name="activity" />
                                    <span className="slider round"></span>
                                </label>
                            </div>

                            <div className="button">
                                <button onClick={handleCancelEdit}>
                                    Annuler <img src="icon-back.png" alt="Return Icon" />
                                </button>
                                <button type="submit" >
                                    Enregistrer <img src="icon-save-purple.png" alt="Purple save Icon" />
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="domain" >
                            <h1>Tags</h1>
                            <div className="tag">
                                <p>{domainData.domainName[0].tags[0]}</p>
                                <p>{domainData.domainName[0].tags[1]}</p>
                                <p>{domainData.domainName[0].tags[2]}</p>
                                <p>{domainData.domainName[0].tags[3]}</p>
                                <p>{domainData.domainName[0].tags[4]}</p>
                            </div>
                            <div className="barre"></div>


                            <div className="activite">
                                <h1>Actif</h1>
                                <label id="activite" className="switch">
                                    <input type="checkbox" checked={domainData.activity === 'actif' ? true : false} />
                                    <span className="slider round"></span>
                                </label>
                            </div>

                            <div className="button">
                                <button onClick={handleEditDomainClick} >
                                    Modifier <img src="icon-update-purple.png" alt="Purple update Icon" />
                                </button>
                                <button onClick={handleDeleteDomain}>
                                    Supprimer <img src="icon-trash.png" alt="Trash Icon" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div >
    );
}