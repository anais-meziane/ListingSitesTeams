import React, { useState, useEffect } from 'react';
import "./Mymenu.css";
import { TabList, Tab } from '@fluentui/react-components';
import { VerticalMenu } from './VerticalMenu';
import { Maintenance } from './Maintenance';
import { Hebergement } from './Hebergement';
import { Mails } from './Mails';

export function Mymenu(props) {

    const { companyData } = props
    const token = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/)[2];

    console.log(companyData)

    const [selectedValue, setSelectedValue] = useState("domain");

    const onTabSelect = (event, data) => {
        setSelectedValue(data.value);
    }

    return (
        <div className="container">
            <div>
                <TabList className="tablist" selectedValue={selectedValue} onTabSelect={onTabSelect} >
                    <Tab id='domain' value='domain'>
                        Noms de domaine
                    </Tab>
                    <Tab id='maintenance' value='maintenance'>
                        Maintenance
                    </Tab>
                    <Tab id='hebergement' value='hebergement'>
                        Hébergement
                    </Tab>
                    <Tab id='mails' value='mails'>
                        Mails
                    </Tab>
                </TabList>
                <div className="sections">
                    {selectedValue === 'domain' && (
                        <div>
                            <VerticalMenu companyData={companyData} />
                        </div>
                    )}
                    {selectedValue === 'maintenance' && (
                        <div>
                            <Maintenance companyData={companyData} />
                        </div>
                    )}
                    {selectedValue === 'hebergement' && (
                        <div>
                            <Hebergement companyData={companyData} />
                        </div>
                    )}
                    {selectedValue === 'mails' && (
                        <div>
                            <Mails companyData={companyData} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}