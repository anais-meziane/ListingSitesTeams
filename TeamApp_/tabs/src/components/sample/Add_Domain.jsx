import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export function Add_Domain(props) {

    const { companyData } = props;
    const history =useHistory();

    const handleAddDomainSubmit = async (event) => {
        event.preventDefault();

        // Traitement des données
        const formData = new FormData(document.getElementById('addDomainForm')); // Récupération des données dans le formulaire

        const tags = formData.get('tags');
        const tagsArray = tags ? tags.split(',') : [];

        const newDomain = {
            name_domain: formData.get('name_domain'),
            extensions: [{
                name_extension: formData.get('name_extension'),
                googleIndex: formData.get('googleIndex') ? formData.get('googleIndex') === 'on' : false,
                yahooIndex: formData.get('yahooIndex') ? formData.get('yahooIndex') === 'on' : false,
                bingIndex: formData.get('bingIndex') ? formData.get('bingIndex') === 'on' : false,
            }],
            tags: tagsArray
        };

        const token = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/)[2];

        try {
            const response = await fetch(`http://localhost:8000/api/postDomain/${companyData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newDomain)
            });
            if (response.ok) {
                console.log('Nouveau domaine ajouté avec succès');
                alert("Le nouveau domaine a été ajouté avec succès !");
                redirectToInformationPage(companyData);
            } else {
                console.log(formData);
                console.error("Erreur lors de l'ajout du nouveau domaine");
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

    return (
        <div className='add_domain'>
            <h1>Ajouter un nouveau domaine à {companyData.name_company}</h1>

            <form method="POST" id="addDomainForm" onSubmit={handleAddDomainSubmit}>
                <label>
                    <b>Nom du nouveau domaine :</b>
                    <input type="text" name="name_domain" placeholder="Ex. jhonny-export" required />
                </label>

                <label>
                    <b>Extension du nouveau domaine :</b>
                    <input type="text" name="name_extension" placeholder="Ex. org" required />
                </label>

                <label>
                    <b>Tags du nouveau domaine :</b>
                    <input type="text" name="tags" placeholder="Ex. Acteur, Cinéma" required />
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
    );
}