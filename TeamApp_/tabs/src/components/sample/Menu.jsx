import React, { useState, useEffect } from 'react';
import "./Publish.css";
import { Menu } from "@fluentui/react-northstar";
import { VerticalMenu } from "./VerticalMenu";
import { Maintenance } from './Maintenance';
import { Hebergement } from './Hebergement';
import { Mails } from './Mails';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export function Mymenu(props) {

    const { companyData } = props;
    const steps = ["domain", "maintenance", "hebergement", "mails"];
    const friendlyStepsName = {
        domain: "Noms de domaine",
        maintenance: "Maintenance",
        hebergement: "Hébergement",
        mails: "Mails",
    };

    const history = useHistory();
    const [selectedMenuItem, setSelectedMenuItem] = useState("domain");
    const items = steps.map((step) => {
        return {
            key: step,
            content: friendlyStepsName[step] || "",
            onClick: () => setSelectedMenuItem(step),
        };
    });

    useEffect(() => {
        const interval = setInterval(() => {
            history.push("/connect");
        }, 60 * 60 * 1000); 

        return () => clearInterval(interval);
    }, [history]);


    return (
        <div className="container">
            <div className="menu">
                <Menu defaultActiveIndex={0} items={items} underlined />
                <div className="sections">
                    {selectedMenuItem === "domain" && (
                        <div>
                            <VerticalMenu companyData={companyData} />
                        </div>
                    )}
                    {selectedMenuItem === "maintenance" && (
                        <div>
                            <Maintenance companyData={companyData} />
                        </div>
                    )}
                    {selectedMenuItem === "hebergement" && (
                        <div>
                            <Hebergement companyData={companyData} />
                        </div>
                    )}
                    {selectedMenuItem === "mails" && (
                        <div>
                            <Mails companyData={companyData} />
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

