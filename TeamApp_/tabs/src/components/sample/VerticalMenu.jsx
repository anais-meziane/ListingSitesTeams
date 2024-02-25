import React from "react";
import { useState } from "react";
import { Domain } from "./Domain";
import { Add_Domain } from "./Add_Domain";

export function VerticalMenu(props) {

  const { companyData } = props;

  const handleDomainClick = (domainId) => {
    setActiveDomainId(domainId);
    setIsAddActive(false);
    setShowAddPage(false);
    setShowDomainContent(true);
  };

  const domainName = companyData.domainName || []; // Récupération de la liste des domaines de la société

  const [activeDomainId, setActiveDomainId] = useState(null);
  const [isAddActive, setIsAddActive] = useState(false);
  const [showAddPage, setShowAddPage] = useState(false);
  const [showDomainContent, setShowDomainContent] = useState(false);

  const handleAddClick = () => {
    setIsAddActive(!isAddActive);
    setActiveDomainId(null);
    setShowAddPage(true);
    setShowDomainContent(false);
  };

  return (
    <div className="vertical-menu-container">
      <ul className="vertical-menu">
        {domainName.map((domain) => (
          <li
            key={domain._id}
            className={domain._id === activeDomainId ? "active" : ""}
            onClick={() => handleDomainClick(domain._id)}
          >
            <button
              type="button"
              className={domain._id === activeDomainId ? "active" : ""}
            >
              {domain.name_domain}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            className={`add_domain ${isAddActive ? "active" : ""}`}
            onClick={handleAddClick}
          >
            <img className="add_domain_img" src={isAddActive ? "icon-add.png" : "icon-add-empty.png"} alt="Add Icon" />
          </button>
        </li>
      </ul>
      <div className="vertical-menu-content">
        {showAddPage ? (
          <Add_Domain companyData={companyData} />
        ) : showDomainContent && activeDomainId ? (
          activeDomainId && <Domain companyData={companyData} domainId={activeDomainId} />
        ) : (
          <p className="no_result_p">Sélectionnez un domaine</p>
        )}
      </div>
    </div>
  );
}







