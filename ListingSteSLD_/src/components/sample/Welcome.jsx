import { useState, useEffect } from "react"
import ReactDOM from 'react-dom'
import "./Welcome.css"
import { Information } from "./Information"
import { Connexion } from "./Connexion"

export function Welcome(props) {

  const [companies, setCompanies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [companiesPerPage, setCompaniesPerPage] = useState(8)
  const [sortOrder, setSortOrder] = useState('desc')
  const [showForm, setShowForm] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null);
  const token = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/)[2];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/getAll', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json()
      setCompanies(result)
    };

    fetchData()
  }, [showForm]);

  useEffect(() => {
    const results = companies.filter(Company =>
      Company.name_company.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
    setSearchResults(results)
    setCurrentPage(1)
  }, [searchTerm, companies])

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  }

  const sortCompanies = () => {
    let sorted = [...searchResults]
    if (sortOrder === 'desc') {
      sorted.sort((a, b) => a.name_company.localeCompare(b.name_company))
      setSortOrder('asc')
    } else {
      sorted.sort((a, b) => b.name_company.localeCompare(a.name_company))
      setSortOrder('desc')
    }
    setSearchResults(sorted)
  }

  const sortActivity = () => {
    let sorted = [...searchResults]
    sorted.sort((a, b) => {
      if (a.activity === 'actif' && b.activity === 'actif') {
        return -1
      } else if (a.activity !== 'actif' && b.activity === 'actif') {
        return 1
      } else {
        return 0
      }
    })
    setSearchResults(sorted)
  }

  const sortAuthor = () => {
    let sorted = [...searchResults]
    if (sortOrder === 'desc') {
      sorted.sort((a, b) => a.author.localeCompare(b.author))
      setSortOrder('asc')
    } else {
      sorted.sort((a, b) => b.author.localeCompare(a.author))
      setSortOrder('desc')
    }
    setSearchResults(sorted)
  }

  const handleForm = () => {
    setShowForm(true)
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(document.getElementById('myForm'))

    const tags = formData.get('tags');
    const tagsArray = tags ? tags.split(',') : [];

    const activityStatus = document.querySelector('input[name="activity"]').checked ? 'actif' : 'non-actif'

    const companyData = {
      name_company: formData.get('name_company'),
      description_company: formData.get('description_company'),
      activity: activityStatus,
      author: formData.get('author'),
      domainName: [{
        name_domain: formData.get('name_domain'),
        extensions: [{
          name_extension: formData.get('name_extension'),
          googleIndex: formData.get('googleIndex') ? formData.get('googleIndex') === 'on' : false,
          yahooIndex: formData.get('yahooIndex') ? formData.get('yahooIndex') === 'on' : false,
          bingIndex: formData.get('bingIndex') ? formData.get('bingIndex') === 'on' : false,
        }],
        tags: tagsArray
      }],
      maintenance: [{
        name_maintenance: formData.get('name_maintenance'),
        description_maintenance: formData.get('description_maintenance'),
      }],
      mail: [{
        mail: formData.get('mail'),
        description_mail: formData.get('description_mail')
      }],
      hosting: [{
        name_hosting: formData.get('name_hosting'),
        description_hosting: formData.get('description_hosting'),
        ipv4: formData.get('ipv4'),
        ipv6: formData.get('ipv6')
      }]
    };

    try {
      const response = await fetch('http://localhost:8000/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(companyData)
      });
      if (response.ok) {
        console.log('Données ajoutées avec succès')
        alert("Votre entreprise a été ajoutée avec succès !")
        ReactDOM.render(<Welcome />, document.getElementById('root'));
      } else {
        console.log(formData);
        console.error("Erreur lors de l'ajout des données")
      }
    } catch (error) {
      console.error("Erreur lors de la requête", error)
    };
    setShowForm(false)
  };

  const handleFormCancel = () => {
    setShowForm(false)
  };

  function handleShowInfo(event, companyName) {
    event.preventDefault();
    const name = companyName || event.currentTarget.parentNode.parentNode.cells[0].innerText;
    const selectedCompany = companies.find(c => c.name_company === name);
    setSelectedCompany(name)
    ReactDOM.render(<Information selectedCompany={selectedCompany} />, document.getElementById('root'))
    setShowInfo(true)
  }

  const handleInfoSubmit = (event) => {
    event.preventDefault();
    setShowInfo(false);
  };

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = searchResults.slice(indexOfFirstCompany, indexOfLastCompany);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleConnect = () => {
    ReactDOM.render(<Connexion />, document.getElementById('root'))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      ReactDOM.render(<Connexion />, document.getElementById('root'))
    }, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="accueil">
      <div className="search">
        <button className="home"> <img src="icon-home.png" alt="Home Icon" /> </button>
        <div className="searchBar">
          <input type="text" placeholder="Rechercher" value={searchTerm} onChange={handleSearchChange} />
          <img src="icon-search.png" alt="Search Icon" />
        </div>

        <div className="filters">
          <h2>Filtres</h2>
          <button className="btnfilters" id="alphabetique" onClick={sortCompanies}>
            <img src="icon-alphabetique.png" alt="Tri alphabétique Icon" />
          </button>
          <button className="btnfilters" id="activity" onClick={sortActivity}>
            <img src="icon-activity.png" alt="Activity Icon" />
          </button>
          <button className="btnfilters" id="author" onClick={sortAuthor}>
            <img src="icon-user.png" alt="User Icon" />
          </button>
        </div>

        <div className="btnAjout">
          <button className="btnAjouter" onClick={handleForm}>
            Ajouter
            <img src="icon-plus-purple.png" alt="Purple Plus Icon" />
          </button>
          <button className="btnDeconnexion" onClick={handleConnect} >
            Déconnexion
          </button>
        </div>
      </div>

      {showForm && (
        <div className="popup">
          <form method="POST" id="myForm" onSubmit={handleFormSubmit}>
            <div className="popup-header">
              <h2>Ajouter une entreprise</h2>
              <button onClick={handleFormCancel}>
                <img src="icon-cross.png" alt="Cross Icon" />
              </button>
            </div>

            <div className="row1">
              <div className="col1">
                <label>
                  <b>Nom :</b>
                  <input type="text" name="name_company" placeholder="Ex. Jhonny" required />
                </label>

                <label>
                  <b>Description :</b>
                  <textarea type="text" name="description_company" placeholder="Ex. Voici une description de Jhonny" required />
                </label>
              </div>

              <div className="col2">
                <div className="activity">
                  <b>Actif :</b>
                  <label id="activite" className="switch">
                    <input type="checkbox" name="activity" />
                    <span className="slider round"></span>
                  </label>
                </div>

                <label>
                  <b>Auteur :</b>
                  <input type="text" name="author" placeholder="Ex. Cédric" required />
                </label>
              </div>
            </div>

            <div className="row2">
              <div className="col1">
                <label>
                  <b>Nom de domaine :</b>
                  <input type="text" name="name_domain" placeholder="Ex. jhonny-depp" required />
                </label>
              </div>

              <div className="col2">
                <label>
                  <b>Extension :</b>
                  <input type="text" name="name_extension" placeholder="Ex. com" required />
                </label>

                <label>
                  <b>Tag :</b>
                  <input type="text" name="tags" placeholder="Ex. Acteur" required />
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
              </div>
            </div>

            <div className="row3">
              <div className="col1">
                <label>
                  <b>Maintenance :</b>
                  <input type="text" name="name_maintenance" placeholder="Ex. Office" required />
                </label>
              </div>

              <div className="col2">
                <label>
                  <b>Description de la maintenance :</b>
                  <textarea type="text" name="description_maintenance" placeholder="Ex. La maintenance du site de Jhonne est faite par Office." required />
                </label>
              </div>
            </div>

            <div className="row4">
              <div className="col1">
                <label>
                  <b>Mail :</b>
                  <input type="mail" name="mail" placeholder="Ex. jhonny.depp@icloud.com" required />
                </label>
              </div>

              <div className="col2">
                <label>
                  <b>Description du mail :</b>
                  <textarea type="text" name="description_mail" placeholder="Ex. Mail pour contacter directement Jhonny." required />
                </label>
              </div>
            </div>

            <div className="row5">
              <div className="col1">
                <label>
                  <b>Hébergement :</b>
                  <input type="mail" name="name_hosting" placeholder="Ex. Studio Little Dreams" required />
                </label>

                <label>
                  <b>Description de l'hébergement :</b>
                  <textarea type="text" name="description_hosting" placeholder="Ex. C'est Studio Little Dreams qui s'occupe de l'hébergement du site de Jhonny." required />
                </label>
              </div>

              <div className="col2">
                <label>
                  <b>Adresse IPv4 :</b>
                  <input type="text" name="ipv4" placeholder="Ex. 192.17.33.96" />
                </label>

                <label>
                  <b>Adresse IPv6 :</b>
                  <input type="text" name="ipv6" placeholder="Ex. 2001:DB8:3C4D:15::1A2F:1A2B" />
                </label>
              </div>
            </div>

            <button type="submit">Ajouter</button>
          </form>
        </div>
      )}

      <div className="table">

        {searchResults.length === 0 ? (
          <p className="no_result_p">Aucun résultat n'a été trouvé pour votre recherche. <br /> <br /> Il vous est toujours possible de l'ajouter via le bouton "Ajouter" !</p>
        ) : (

          <div className='divtable'>

            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Description</th>
                  <th>Actif</th>
                  <th>Auteur</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentCompanies.map(Company => (
                  <tr key={Company._id}>
                    <td className='name'>{Company.name_company}</td>
                    <td className='description'>{Company.description_company}</td>
                    <td className='activity'>{Company.activity === 'actif' ? (
                      <img src="icon-OK.png" alt="OK Icon" />
                    ) : (
                      <img src="icon-cross.png" alt="Cross Icon" />
                    )}</td>
                    <td className='author'>{Company.author}</td>
                    <td className='icon'>
                      <button onClick={(event) => { handleShowInfo(event, Company.name_company) }}>
                        <img src="icon-parameters.png" alt="Parameters Icon" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


            <div className="pagination">
              <Pagination
                companiesPerPage={companiesPerPage}
                totalCompanies={searchResults.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </div>

          </div>
        )}
      </div>

      {showInfo && (
        <form className="popup-info" onSubmit={handleInfoSubmit}>
          {/* <Information selectedCompany={selectedCompany} /> */}
        </form>
      )}

    </div>

  );
}



function Pagination({ companiesPerPage, totalCompanies, currentPage, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCompanies / companiesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="btnPrecedent"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src="icon-arrow-left.png" alt="Arrow left Icon" />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </button>
      ))}
      <button
        className="btnSuivant"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
      >
        <img src="icon-arrow-right.png" alt="Arrow right Icon" />
      </button>
    </div>
  );
}
