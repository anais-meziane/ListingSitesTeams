import React, { useState, useEffect } from 'react';
import "./Hebergement.css";

export function Hebergement(props) {

    const { companyData } = props
    const [dataCompany, setDataCompany] = useState({})
    const [editHosting, setEditHosting] = useState(false)
    const [nameHosting, setNameHosting] = useState("")
    const [descriptionHosting, setDescriptionHosting] = useState("")
    const [ipv4, setIpv4] = useState("")
    const [ipv6, setIpv6] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const url_upd = `http://localhost:8000/api/updateHosting/${companyData.hosting[0]._id}`
    const token = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/)[2]

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:8000/api/getName/${companyData.name_company}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json()
            setDataCompany(result)
            setIsLoading(false)
        }
        fetchData()
    }, [dataCompany])

    const handleChange = (event) => {
        setEditHosting(true);
        const { name, value } = event.target;
        setEditHosting((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = async () => {
        const response = await fetch(url_upd, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name_hosting: nameHosting || companyData.hosting[0].name_hosting,
                description_hosting: descriptionHosting || companyData.hosting[0].description_hosting,
                ipv4: ipv4 || companyData.hosting[0].ipv4,
                ipv6: ipv6 || companyData.hosting[0].ipv6
            })
        });
        if (response.ok) {
            console.log("Entreprise modifiée")
            alert("L'entreprise a été modifié !")
            setEditHosting(false)
        } else {
            console.error("Erreur lors de la modification de l'entreprise :", response.status)
            alert("Votre entreprise n'a pas pu être modifiée pour des raisons diverses")
        }
    }

    const handleCancel = () => {
        setEditHosting(false)
    };

    const handleNameHostingChange = (event) => {
        setNameHosting(event.target.value)
    };

    const handleDescriptionHostingChange = (event) => {
        setDescriptionHosting(event.target.value)
    };

    const handleIpv4Change = (event) => {
        setIpv4(event.target.value)
    };

    const handleIpv6Change = (event) => {
        setIpv6(event.target.value)
    }    

    if (isLoading || !dataCompany) {
        return <p className="no_result_p">Chargement...</p>;
    }

    return (
        <div className="hebergement">
            {editHosting ?
                <>
                    <input
                        type="text"
                        name="name_hosting"
                        disabled={!editHosting}
                        placeholder={dataCompany.hosting[0].name_hosting}
                        onChange={handleNameHostingChange}
                        value={editHosting ? nameHosting : dataCompany.hosting[0].name_hosting}
                    />

                    <textarea
                        name="description_hosting"
                        disabled={!editHosting}
                        placeholder={dataCompany.hosting[0].description_hosting}
                        onChange={handleDescriptionHostingChange}
                        value={editHosting ? descriptionHosting : dataCompany.hosting[0].description_hosting}
                    ></textarea>

                    <div className="ip">
                        <div className="ipv4">
                            <h2>IPv4</h2>
                            <input
                                type="text"
                                disabled={!editHosting}
                                placeholder={dataCompany.hosting[0].ipv4}
                                onChange={handleIpv4Change}
                                value={editHosting ? ipv4 : dataCompany.hosting[0].ipv4}
                            />
                        </div>

                        <div className="ipv6">
                            <h2>IPv6</h2>
                            <input
                                type="text"
                                disabled={!editHosting}
                                placeholder={dataCompany.hosting[0].ipv6}
                                onChange={handleIpv6Change}
                                value={editHosting ? ipv6 : dataCompany.hosting[0].ipv6}
                            />
                        </div>
                    </div>
                </>
                :
                <>
                    <input type="text" name="name_hosting" value={dataCompany.hosting[0].name_hosting} />

                    <textarea name="description_hosting" value={dataCompany.hosting[0].description_hosting}></textarea>

                    <div className="ip">
                        <div className="ipv4">
                            <h2>IPv4</h2>
                            <input type="text" value={dataCompany.hosting[0].ipv4} disabled={!dataCompany.hosting[0].ipv4} />
                        </div>

                        <div className="ipv6">
                            <h2>IPv6</h2>
                            <input type="text" value={dataCompany.hosting[0].ipv6} disabled={!dataCompany.hosting[0].ipv6} />
                        </div>
                    </div>
                </>
            }

            {editHosting ?
                <div className="button">
                    <button id="btn_annuler" onClick={handleCancel}>Annuler <img src="icon-back.png" alt="Back Icon" /></button>
                    <button id="btn_enregistrer" onClick={handleEdit}>Enregistrer <img src="icon-save-purple.png" alt="Save Icon" /></button>
                </div>
                :
                <div className="button">
                    <button id="btn_edit" onClick={handleChange}>Modifier <img src="icon-update-purple.png" alt="Purple update Icon" /></button>
                </div>
            }
        </div>
    )
}