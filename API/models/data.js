const mongoose = require('mongoose');
const Company = require('./model');
require('dotenv').config();
const mongoString = process.env.DATABASE_URL;

// Connexion à la base de données (MongoDB)
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

// Les données 
const companies = [
    {
        id_company: 1,
        name_company: "Aba",
        description_company: "Une description d'Aba",
        activity: "actif",
        author: "Baptiste",
        domainName: [
            {
                id_domain: 1,
                name_domain: "aba.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Ventes",
                    "Electroménager",
                    "Aspirateur",
                    "Lave-vaisselle",
                    "Réfrigérateur"
                ]
            },
            {
                id_domain: 2,
                name_domain: "aba-ventes.fr",
                extensions: [
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Electroménager",
                    "Congélateur",
                    "Four",
                    "Machine à laver",
                    "Micro ondes"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 1,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance d'Aba par Site Web."
            },
            {
                id_maintenance: 2,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance d'Aba par Office."
            }
        ],
        mail: [
            {
                id_mail: 1,
                mail: "aba@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 2,
                mail: "contact@aba.fr",
                description_mail: "Mail pour le service client"
            },
            {
                id_mail: 3,
                mail: "sylvie.france@aba.fr",
                description_mail: "Mail RH-Management d'Aba"
            },
            {
                id_mail: 4,
                mail: "jerome.grand@aba.fr",
                description_mail: "Mail technicien de chez Aba"
            },
            {
                id_mail: 5,
                mail: "lucie.verne@aba.fr",
                description_mail: "Mail accueil d'Aba Bordeaux"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement d'Aba chez Studio Little Dreams",
                ipv4: "192.127.12.6"
            }
        ]
    },
    {
        id_company: 2,
        name_company: "Baba",
        description_company: "Une description de Baba",
        activity: "actif",
        author: "Cédric",
        domainName: [
            {
                id_domain: 3,
                name_domain: "baba.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Vêtement",
                    "Sous-vêtement",
                    "Femme",
                    "Homme",
                    "Chaussure"
                ]
            },
            {
                id_domain: 4,
                name_domain: "baba-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Jean",
                    "Robe",
                    "Chemise",
                    "Basket",
                    "Boxer"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 3,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de Baba par Site Web."
            },
            {
                id_maintenance: 4,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de Baba par Office."
            }
        ],
        mail: [
            {
                id_mail: 6,
                mail: "baba@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 7,
                mail: "contact@baba.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Baba chez Studio Little Dreams",
                ipv4: "192.127.12.7"
            }
        ]
    },
    {
        id_company: 3,
        name_company: "Cléa",
        description_company: "Une description de Cléa",
        activity: "non-actif",
        author: "JB",
        domainName: [
            {
                id_domain: 3,
                name_domain: "clea.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Cybercafé",
                    "Boisson",
                    "Café",
                    "Thé",
                    "Lait"
                ]
            },
            {
                id_domain: 4,
                name_domain: "clea-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Végétal",
                    "Dosette",
                    "Arabica",
                    "Café",
                    "Thé"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de Cléa par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de Cléa par Office."
            }
        ],
        mail: [
            {
                id_mail: 8,
                mail: "clea@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 9,
                mail: "contact@clea.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Cléa chez Studio Little Dreams",
                ipv4: "192.127.12.8"
            }
        ]
    },
    {
        id_company: 4,
        name_company: "Descartes",
        description_company: "Une description de Descartes",
        activity: "non-actif",
        author: "Théo",
        domainName: [
            {
                id_domain: 3,
                name_domain: "descartes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Boulangerie",
                    "Pain",
                    "Viennoiserie",
                    "Croissant",
                    "Pain au chocolat"
                ]
            },
            {
                id_domain: 4,
                name_domain: "descartes-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Nourriture",
                    "Cookie",
                    "Sandwich",
                    "Panini",
                    "Muffin"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de Descartes par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de Descartes par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "descartes@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@descartes.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Descartes chez Studio Little Dreams",
                ipv4: "192.127.12.9"
            }
        ]
    },
    {
        id_company: 5,
        name_company: "Epicure",
        description_company: "Une description d'Epicure",
        activity: "non-actif",
        author: "Baptiste",
        domainName: [
            {
                id_domain: 3,
                name_domain: "epicure.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Plat",
                    "Poêle",
                    "Casserole",
                    "Ustensile",
                    "Vaisselle"
                ]
            },
            {
                id_domain: 4,
                name_domain: "epicure-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Verre",
                    "Couvert",
                    "Verrerie",
                    "Vaisselle",
                    "Assiette"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance d'Epicure par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance d'Epicure par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "epicure@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@epicure.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement d'Epicure chez Studio Little Dreams",
                ipv4: "192.127.12.10"
            }
        ]
    },
    {
        id_company: 6,
        name_company: "Friedrich",
        description_company: "Une description de Friedrich",
        activity: "non-actif",
        author: "Cédric",
        domainName: [
            {
                id_domain: 3,
                name_domain: "friedrich.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Ventes",
                    "Electroménager",
                    "Aspirateur",
                    "Lave-vaisselle",
                    "Réfrigérateur"
                ]
            },
            {
                id_domain: 4,
                name_domain: "friedrich-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: false,
                        yahooIndex: false,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Electroménager",
                    "Congélateur",
                    "Four",
                    "Machine à laver",
                    "Micro ondes"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de Friedrich par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de Friedrich par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "friedrich@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@friedrich.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Friedrich chez Studio Little Dreams",
                ipv4: "192.127.12.11"
            }
        ]
    },
    {
        id_company: 7,
        name_company: "Giordano",
        description_company: "Une description de Giordano",
        activity: "actif",
        author: "JB",
        domainName: [
            {
                id_domain: 3,
                name_domain: "giordano.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Vêtement",
                    "Sous-vêtement",
                    "Femme",
                    "Homme",
                    "Chaussure"
                ]
            },
            {
                id_domain: 4,
                name_domain: "giordano-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: false,
                        yahooIndex: false,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Jean",
                    "Robe",
                    "Chemise",
                    "Basket",
                    "Boxer"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de Giordano par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de Giordano par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "giordano@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@giordano.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Giordano chez Studio Little Dreams",
                ipv4: "192.127.12.12"
            }
        ]
    },
    {
        id_company: 8,
        name_company: "Hegel",
        description_company: "Une description d'Hegel",
        activity: "actif",
        author: "Théo",
        domainName: [
            {
                id_domain: 3,
                name_domain: "hegel.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Cybercafé",
                    "Boisson",
                    "Café",
                    "Thé",
                    "Lait"
                ]
            },
            {
                id_domain: 4,
                name_domain: "hegel-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Végétal",
                    "Dosette",
                    "Arabica",
                    "Café",
                    "Thé"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance d'Hegel par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance d'Hegel par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "hegel@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@hegel.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement d'Hegel chez Studio Little Dreams",
                ipv4: "192.127.12.13"
            }
        ]
    },
    {
        id_company: 9,
        name_company: "Ignorance",
        description_company: "Une description d'Ignorance",
        activity: "actif",
        author: "Baptiste",
        domainName: [
            {
                id_domain: 3,
                name_domain: "ignorance.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Boulangerie",
                    "Pain",
                    "Viennoiserie",
                    "Croissant",
                    "Pain au chocolat"
                ]
            },
            {
                id_domain: 4,
                name_domain: "ignorance-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Nourriture",
                    "Cookie",
                    "Sandwich",
                    "Panini",
                    "Muffin"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance d'Ignorance par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance d'Ignorance par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "ignorance@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@ignorance.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement d'Ignorance chez Studio Little Dreams",
                ipv4: "192.127.12.14"
            }
        ]
    },
    {
        id_company: 10,
        name_company: "James",
        description_company: "Une description de James",
        activity: "actif",
        author: "Cédric",
        domainName: [
            {
                id_domain: 3,
                name_domain: "james.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Boulangerie",
                    "Pain",
                    "Viennoiserie",
                    "Croissant",
                    "Pain au chocolat"
                ]
            },
            {
                id_domain: 4,
                name_domain: "james-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Verre",
                    "Couvert",
                    "Verrerie",
                    "Vaisselle",
                    "Assiette"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de James par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de James par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "james@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@james.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de James chez Studio Little Dreams",
                ipv4: "192.127.12.15"
            }
        ]
    },
    {
        id_company: 11,
        name_company: "Karl",
        description_company: "Une description de Karl",
        activity: "non-actif",
        author: "JB",
        domainName: [
            {
                id_domain: 3,
                name_domain: "karl.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Ventes",
                    "Electroménager",
                    "Aspirateur",
                    "Lave-vaisselle",
                    "Réfrigérateur"
                ]
            },
            {
                id_domain: 4,
                name_domain: "karl-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Electroménager",
                    "Congélateur",
                    "Four",
                    "Machine à laver",
                    "Micro ondes"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de Karl par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de Karl par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "karl@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@karl.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Karl chez Studio Little Dreams",
                ipv4: "192.127.12.16"
            }
        ]
    },
    {
        id_company: 12,
        name_company: "Locke",
        description_company: "Une description de Locke",
        activity: "non-actif",
        author: "Théo",
        domainName: [
            {
                id_domain: 3,
                name_domain: "locke.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Vêtement",
                    "Sous-vêtement",
                    "Femme",
                    "Homme",
                    "Chaussure"
                ]
            },
            {
                id_domain: 4,
                name_domain: "locke-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Jean",
                    "Robe",
                    "Chemise",
                    "Basket",
                    "Boxer"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de Locke par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de Locke par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "locke@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@locke.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Locke chez Studio Little Dreams",
                ipv4: "192.127.12.17"
            }
        ]
    },
    {
        id_company: 13,
        name_company: "Montesquieu",
        description_company: "Une description de Montesquieu",
        activity: "non-actif",
        author: "Baptiste",
        domainName: [
            {
                id_domain: 3,
                name_domain: "montesquieu.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Cybercafé",
                    "Boisson",
                    "Café",
                    "Thé",
                    "Lait"
                ]
            },
            {
                id_domain: 4,
                name_domain: "montesquieu-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Végétal",
                    "Dosette",
                    "Arabica",
                    "Café",
                    "Thé"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de Montesquieu par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de Montesquieu par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "montesquieu@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@montesquieu.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Montesquieu chez Studio Little Dreams",
                ipv4: "192.127.12.18"
            }
        ]
    },
    {
        id_company: 14,
        name_company: "Neo",
        description_company: "Une description de Neo",
        activity: "non-actif",
        author: "Cédric",
        domainName: [
            {
                id_domain: 3,
                name_domain: "neo.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Boulangerie",
                    "Pain",
                    "Viennoiserie",
                    "Croissant",
                    "Pain au chocolat"
                ]
            },
            {
                id_domain: 4,
                name_domain: "neo-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Nourriture",
                    "Cookie",
                    "Sandwich",
                    "Panini",
                    "Muffin"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de Neo par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de Neo par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "neo@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@neo.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Neo chez Studio Little Dreams",
                ipv4: "192.127.12.19"
            }
        ]
    },
    {
        id_company: 15,
        name_company: "Onfray",
        description_company: "Une description d'Onfray",
        activity: "actif",
        author: "JB",
        domainName: [
            {
                id_domain: 3,
                name_domain: "onfray.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Plat",
                    "Poêle",
                    "Casserole",
                    "Ustensile",
                    "Vaisselle"
                ]
            },
            {
                id_domain: 4,
                name_domain: "onfray-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Verre",
                    "Couvert",
                    "Verrerie",
                    "Vaisselle",
                    "Assiette"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance d'Onfray par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance d'Onfray par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "onfray@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@onfray.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement d'Onfray chez Studio Little Dreams",
                ipv4: "192.127.12.20"
            }
        ]
    },
    {
        id_company: 16,
        name_company: "Platon",
        description_company: "Une description de Platon",
        activity: "actif",
        author: "Théo",
        domainName: [
            {
                id_domain: 3,
                name_domain: "platon.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Ventes",
                    "Electroménager",
                    "Aspirateur",
                    "Lave-vaisselle",
                    "Réfrigérateur"
                ]
            },
            {
                id_domain: 4,
                name_domain: "platon-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Electroménager",
                    "Congélateur",
                    "Four",
                    "Machine à laver",
                    "Micro ondes"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de Platon par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de Platon par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "platon@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@platon.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Platon chez Studio Little Dreams",
                ipv4: "192.127.12.21"
            }
        ]
    },
    {
        id_company: 17,
        name_company: "Quinn",
        description_company: "Une description de Quinn",
        activity: "actif",
        author: "Baptiste",
        domainName: [
            {
                id_domain: 3,
                name_domain: "quinn.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Vêtement",
                    "Sous-vêtement",
                    "Femme",
                    "Homme",
                    "Chaussure"
                ]
            },
            {
                id_domain: 4,
                name_domain: "quinn-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Jean",
                    "Robe",
                    "Chemise",
                    "Basket",
                    "Boxer"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de Quinn par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de Quinn par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "quinn@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@quinn.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Quinn chez Studio Little Dreams",
                ipv4: "192.127.12.22"
            }
        ]
    },
    {
        id_company: 18,
        name_company: "Russell",
        description_company: "Une description de Russell",
        activity: "actif",
        author: "Cédric",
        domainName: [
            {
                id_domain: 3,
                name_domain: "russell.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Cybercafé",
                    "Boisson",
                    "Café",
                    "Thé",
                    "Lait"
                ]
            },
            {
                id_domain: 4,
                name_domain: "russell-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Végétal",
                    "Dosette",
                    "Arabica",
                    "Café",
                    "Thé"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de Russell par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de Russell par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "russell@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@russell.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Russell chez Studio Little Dreams",
                ipv4: "192.127.12.23"
            }
        ]
    },
    {
        id_company: 19,
        name_company: "Socrate",
        description_company: "Une description de Socrate",
        activity: "non-actif",
        author: "JB",
        domainName: [
            {
                id_domain: 3,
                name_domain: "socrate.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Boulangerie",
                    "Pain",
                    "Viennoiserie",
                    "Croissant",
                    "Pain au chocolat"
                ]
            },
            {
                id_domain: 4,
                name_domain: "socrate-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Nourriture",
                    "Cookie",
                    "Sandwich",
                    "Panini",
                    "Muffin"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de Socrate par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de Socrate par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "socrate@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@socrate.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Socrate chez Studio Little Dreams",
                ipv4: "192.127.12.24"
            }
        ]
    },
    {
        id_company: 20,
        name_company: "Thor",
        description_company: "Une description de Thor",
        activity: "non-actif",
        author: "Théo",
        domainName: [
            {
                id_domain: 3,
                name_domain: "thor.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Plat",
                    "Poêle",
                    "Casserole",
                    "Ustensile",
                    "Vaisselle"
                ]
            },
            {
                id_domain: 4,
                name_domain: "thor-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Verre",
                    "Couvert",
                    "Verrerie",
                    "Vaisselle",
                    "Assiette"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de Thor par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de Thor par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "thor@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@thor.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Thor chez Studio Little Dreams",
                ipv4: "192.127.12.25"
            }
        ]
    },
    {
        id_company: 21,
        name_company: "Ulysse",
        description_company: "Une description d'Ulysse",
        activity: "non-actif",
        author: "Baptiste",
        domainName: [
            {
                id_domain: 3,
                name_domain: "ulysse.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Ventes",
                    "Electroménager",
                    "Aspirateur",
                    "Lave-vaisselle",
                    "Réfrigérateur"
                ]
            },
            {
                id_domain: 4,
                name_domain: "ulysse-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Electroménager",
                    "Congélateur",
                    "Four",
                    "Machine à laver",
                    "Micro ondes"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance d'Ulysse par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance d'Ulysse par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "ulysse@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@ulysse.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement d'Ulysse chez Studio Little Dreams",
                ipv4: "192.127.12.26"
            }
        ]
    },
    {
        id_company: 22,
        name_company: "Voltaire",
        description_company: "Une description de Voltaire",
        activity: "non-actif",
        author: "Cédric",
        domainName: [
            {
                id_domain: 3,
                name_domain: "voltaire.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Vêtement",
                    "Sous-vêtement",
                    "Femme",
                    "Homme",
                    "Chaussure"
                ]
            },
            {
                id_domain: 4,
                name_domain: "ulysse-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Jean",
                    "Robe",
                    "Chemise",
                    "Basket",
                    "Boxer"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de Voltaire par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de Voltaire par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "voltaire@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@voltaire.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Voltaire chez Studio Little Dreams",
                ipv4: "192.127.12.27"
            }
        ]
    },
    {
        id_company: 23,
        name_company: "William",
        description_company: "Une description de William",
        activity: "actif",
        author: "JB",
        domainName: [
            {
                id_domain: 3,
                name_domain: "william.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Cybercafé",
                    "Boisson",
                    "Café",
                    "Thé",
                    "Lait"
                ]
            },
            {
                id_domain: 4,
                name_domain: "william-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Végétal",
                    "Dosette",
                    "Arabica",
                    "Café",
                    "Thé"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de William par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de William par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "william@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@william.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Willam chez Studio Little Dreams",
                ipv4: "192.127.12.28"
            }
        ]
    },
    {
        id_company: 24,
        name_company: "Xavier",
        description_company: "Une description de Xavier",
        activity: "actif",
        author: "Théo",
        domainName: [
            {
                id_domain: 3,
                name_domain: "xavier.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: false
                    },
                    {
                        id_extension: 2,
                        name_extension: "org",
                        googleIndex: false,
                        yahooIndex: true,
                        bingIndex: true
                    }
                ],
                tags: [
                    "Boulangerie",
                    "Pain",
                    "Viennoiserie",
                    "Croissant",
                    "Pain au chocolat"
                ]
            },
            {
                id_domain: 4,
                name_domain: "xavier-ventes.fr",
                extensions: [
                    {
                        id_extension: 1,
                        name_extension: "org",
                        googleIndex: true,
                        yahooIndex: false,
                        bingIndex: true
                    },
                    {
                        id_extension: 2,
                        name_extension: "fr",
                        googleIndex: true,
                        yahooIndex: true,
                        bingIndex: false
                    }
                ],
                tags: [
                    "Nourriture",
                    "Cookie",
                    "Sandwich",
                    "Panini",
                    "Muffin"
                ]
            }
        ],
        maintenance: [
            {
                id_maintenance: 5,
                name_maintenance: "Site Web",
                description_maintenance: "Description de la maintenance de Xavier par Site Web."
            },
            {
                id_maintenance: 6,
                name_maintenance: "Office",
                description_maintenance: "Description de la maintenance de Xavier par Office."
            }
        ],
        mail: [
            {
                id_mail: 10,
                mail: "xavier@orange.fr",
                description_mail: "Mail pour contacter le PDG"
            },
            {
                id_mail: 11,
                mail: "contact@xavier.fr",
                description_mail: "Mail pour le service client"
            }
        ],
        hosting: [
            {
                id_hosting: 1,
                name_hosting: "Studio Little Dreams",
                description_hosting: "Description de l'hébergement de Xavier chez Studio Little Dreams",
                ipv4: "192.127.12.29"
            }
        ]
    }
];

// Fonction pour ajouter des companies à la base de données
async function addCompanies() {
    try {
        const result = await Company.create(companies);
        console.log(result);
    } catch (error) {
        console.log(error.message);
    }
}

// Appel de la fonction addCompanies()
addCompanies();