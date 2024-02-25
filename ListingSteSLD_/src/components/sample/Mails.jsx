import React, { useState, useEffect } from 'react';
import "./Mails.css";

export function Mails(props) {

    const { companyData } = props
    const [dataCompany, setDataCompany] = useState({})

    const [searchValue, setSearchValue] = useState("")
    const [isAddingMail, setIsAddingMail] = useState(false)
    const [mailIndex, setMailIndex] = useState(-1)
    const [isEditingMail, setIsEditingMail] = useState(false)
    const [nameMail, setNameMail] = useState("")
    const [descriptionMail, setDescriptionMail] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    const mailPerPage = 3
    const totalPage = Math.ceil(companyData.mail.length / mailPerPage)
    const indexOfLastMail = currentPage * mailPerPage
    const indexOfFirstMail = indexOfLastMail - mailPerPage
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

    if (isLoading || !dataCompany) {
        return <p className="no_result_p">Chargement...</p>;
    }

    const handleChange = (event) => {
        setSearchValue(event.target.value)
    }

    const filteredMails = dataCompany.mail.filter(mail => (
        mail.mail.toLowerCase().includes(searchValue.toLowerCase()) ||
        mail.description_mail.toLowerCase().includes(searchValue.toLowerCase())
    ))

    const currentMails = filteredMails.slice(indexOfFirstMail, indexOfLastMail)

    const handleAddMail = () => {
        setIsAddingMail(true)
    }

    const handleCloseAddMail = () => {
        setIsAddingMail(false)
    }

    const handleAddMailSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData(document.getElementById('addMailForm'))

        const newMail = {
            mail: formData.get('mail'),
            description_mail: formData.get('description_mail')
        };

        try {
            const response = await fetch(`http://localhost:8000/api/postMail/${companyData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newMail)
            });
            if (response.ok) {
                console.log('Nouveau mail ajouté avec succès')
                alert("Le nouveau mail a été ajouté avec succès !")
                setIsAddingMail(false)
            } else {
                console.error("Erreur lors de l'ajout du nouveau mail")
                alert("Le mail n'a pas pu être ajouté")
            }
        } catch (error) {
            console.error('Erreur lors de la requête', error)
        }
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1)
    }

    const handleEdit = (index) => {
        setIsEditingMail(true)
        setMailIndex(index)
    }

    const handleCancelEdit = () => {
        setIsEditingMail(false)
        setMailIndex(-1)
    }

    const handleUpdate = async () => {
        const response = await fetch(`http://localhost:8000/api/updateMail/${dataCompany.mail[mailIndex]._id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                mail: nameMail || dataCompany.mail[mailIndex].mail,
                description_mail: descriptionMail || dataCompany.mail[mailIndex].description_mail
            })
        })
        if (response.ok) {
            console.log("Mail modifié")
            alert("Le mail a été modifié !")
            setIsEditingMail(false)
            setMailIndex(-1)
        } else {
            console.error("Erreur lors de la modification du mail :", response.status)
            alert("Votre mail n'a pas pu être modifié pour des raisons diverses")
        }
    }

    const handleMailChange = (event) => {
        const value = event.target.value
        setNameMail(value)
    }

    const handleDescriptionChange = (event) => {
        const value = event.target.value
        setDescriptionMail(value)
    }

    const handleDelete = async () => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce mail ?");
        console.log(companyData.mail);
        if (!confirmed) {
            return
        }

        const response = await fetch(`http://localhost:8000/api/deleteMail/${dataCompany.mail[mailIndex]._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            console.log("Mail supprimé")
            alert("Le mail a été supprimé, vous allez être redirigé vers la page d'accueil des informations de l'entreprise !")
            setIsEditingMail(false)
            setMailIndex(-1)
        } else {
            console.error("Erreur lors de la suppression du mail :", response.status)
            alert("Votre mail n'a pas pu être supprimé pour des raisons diverses")
        }
    }

    return (
        <div className="mails">
            <div className="header-mail">
                <div className="searchBar-mail">
                    <input type="text" placeholder="Rechercher" value={searchValue} onChange={handleChange} />
                    <img src="icon-search-white.png" alt="Search white Icon" />
                </div>
                <button type="button" onClick={handleAddMail} >Ajouter <img src="icon-plus-white.png" alt="Plus Icon" /></button>
            </div>

            {isAddingMail ? (
                <div className="addMail">
                    <div className="header-addMail">
                        <h1>Ajouter un mail pour {dataCompany.name_company}</h1>
                        <button type="close" onClick={handleCloseAddMail}><img src="icon-cross.png" alt="Cross Icon" /></button>
                    </div>

                    <form method="POST" id="addMailForm" onSubmit={handleAddMailSubmit}>
                        <label>
                            <b>Mail :</b>
                            <input type="text" name="mail" placeholder="Ex. jhonny.depp@icloud.com" required />
                        </label>

                        <label>
                            <b>Description du mail :</b>
                            <textarea type="text" name="description_mail" placeholder="Ex. Mail pour contacter directement Jhonny." required />
                        </label>

                        <button type="submit">Ajouter</button>
                    </form>
                </div>
            ) : (
                <div>
                    {currentMails.map((mail, index) => (
                        <div className="mail" key={index}>
                            <div className="mail-name">
                                <input
                                    type="text"
                                    name="mail"
                                    disabled={mailIndex !== index}
                                    value={mailIndex === index ? nameMail : mail.mail}
                                    placeholder={mail.mail}
                                    onChange={handleMailChange}
                                />
                                {mailIndex === index ? (
                                    <div className="buttonMail">
                                        <button id="btn-ann" onClick={handleCancelEdit}>
                                            <img src="icon-back.png" alt="Return Icon" />
                                        </button>
                                        <button id="btn-enr" onClick={handleUpdate}>
                                            <img src="icon-save-purple.png" alt="Save Icon" />
                                        </button>
                                        <button id="btn-supp" onClick={handleDelete}>
                                            <img src="icon-trash.png" alt="Delete Icon" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="buttonMail">
                                        <button type="update" onClick={() => handleEdit(index)}>
                                            <img src="icon-update-purple.png" alt="Update Icon" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <textarea
                                name="description_mail"
                                disabled={mailIndex !== index}
                                value={mailIndex === index ? descriptionMail : mail.description_mail}
                                placeholder={mail.description_mail}
                                onChange={handleDescriptionChange}
                            ></textarea>
                        </div>
                    ))}
                    <div className="pagination">
                        <button disabled={currentPage === 1} onClick={handlePrevPage} className="btnPrecedent">
                            <img src="icon-arrow-left.png" alt="Left arrow Icon" />
                        </button>

                        {Array.from({ length: totalPage }, (_, i) => i + 1).map((pageNumber, index) => (
                            <button
                                key={index}
                                className={pageNumber === currentPage ? 'active' : ''}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}
                        <button disabled={currentPage === totalPage} onClick={handleNextPage} className="btnSuivant">
                            <img src="icon-arrow-right.png" alt="Right arrow Icon" />
                        </button>
                    </div>
                </div>
            )}
        </div >
    )
}