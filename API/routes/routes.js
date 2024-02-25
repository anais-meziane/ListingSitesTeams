const express = require('express');
const isAuthenticated = require('../middleware/auth')
const router = express.Router();
const Company = require('../models/model');
// const Data = (require('./models/data'));

module.exports = router;

// Endpoint pour la récupération des données

//---------------- Post Method
router.post('/post', isAuthenticated, async (req, res) => {
    const requiredFields = ['name_company', 'description_company', 'activity', 'author', 'domainName', 'maintenance', 'hosting', 'mail'];


    if (!req.body || !requiredFields.every((field) => req.body.hasOwnProperty(field))) {
        return res.status(400).send('Tous les champs requis doivent être fournis.');
    }

    const company = new Company(req.body);

    try {
        await company.save();
        res.status(201).send(company);
    } catch (err) {
        res.status(500).send("Erreur lors de l'enregistrement de la nouvelle entreprise.");
        console.log(err);
    }
});

//---------------- Post Domain Method
router.post('/postDomain/:_id', isAuthenticated, async (req, res) => {

    const { _id } = req.params;
    const newDomain = req.body;

    try {
        const company = await Company.findById(_id);
        company.domainName = [...company.domainName, newDomain];
        await company.save();
        res.status(200).send('Nouveau domaine ajouté avec succès');
    } catch (err) {
        res.status(500).send(`Erreur lors de l'ajout du nouveau domaine pour l'entreprise.`);
        console.log(err);
    }
});

//---------------- Post Extension Method
router.post('/postExtension/:_id/:name_domain', isAuthenticated, async (req, res) => {

    const { _id, name_domain } = req.params;
    const newExtension = req.body;

    try {
        const company = await Company.findById(_id);
        const domain = company.domainName.find((d) => d.name_domain === name_domain);
        domain.extensions.push(newExtension);
        await company.save();
        res.status(200).send('Nouvelle extension ajouté avec succès');
    } catch (err) {
        res.status(500).send(`Erreur lors de l'ajout de la nouvelle extension pour l'entreprise.`);
        console.log(err);
    }
});

//---------------- Post Maintenance Method
router.post('/postMaintenance/:_id', isAuthenticated, async (req, res) => {

    const { _id } = req.params;
    const newMaintenance = req.body;

    try {
        const company = await Company.findById(_id);
        company.maintenance.push(newMaintenance);
        await company.save();
        res.status(200).send('Nouvelle maintenance ajoutée avec succès');
    } catch (err) {
        res.status(500).send(`Erreur lors de l'ajout de la nouvelle maintenance pour l'entreprise.`);
        console.log(err);
    }
});

//---------------- Post Mail Method
router.post('/postMail/:_id', isAuthenticated, async (req, res) => {

    const { _id } = req.params;
    const newMail = req.body;

    try {
        const company = await Company.findById(_id);
        company.mail.push(newMail);
        await company.save();
        res.status(200).send('Nouveau mail ajouté avec succès');
    } catch (err) {
        res.status(500).send(`Erreur lors de l'ajout du nouveau mail pour l'entreprise.`);
        console.log(err);
    }
});

//---------------- Get All Method
router.get('/getAll', isAuthenticated, async (req, res) => {
    try {
        const data = await Company.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//---------------- Get by ID Method
router.get('/get/:_id', isAuthenticated, async (req, res) => {
    try {
        const company = await Company.findOne({ _id : req.params._id });
        if (!company) {
            return res.status(404).send("L'entreprise demandée n'a pas été trouvée");
        }
        res.send(company);
    } catch (error) {
        res.status(500).send(error);
    }
});

//---------------- Get by NAME Method
router.get('/getName/:name_company', isAuthenticated, async (req, res) => {
    try {
        const company = await Company.findOne({ name_company: req.params.name_company });
        if (!company) {
            return res.status(404).send("L'entreprise demandée n'a pas été trouvée");
        }
        res.send(company);
    } catch (error) {
        res.status(500).send(error);
    }
});

//---------------- Get domainId Method
router.get('/getDomain/:_id', isAuthenticated, async (req, res) => {
    try {
        const company = await Company.findOne(
            {
                domainName: { $elemMatch: { _id: req.params._id } }
            }, {
            _id: 1,
            name_company: 1,
            activity: 1,
            'domainName.$': 1
        });
        if (!company) {
            return res.status(404).send("Le nom de domaine demandée n'a pas été trouvée");
        }
        res.send(company);
    } catch (error) {
        res.status(500).send(error);
    }
});

//---------------- Update Description by ID Method
router.patch('/update/:_id', isAuthenticated, async (req, res) => {
    const { _id } = req.params;
    const { name_company, description_company } = req.body;

    try {
        const company = await Company.findOneAndUpdate(
            { _id: _id },
            { name_company, description_company },
            { new: true }
        );
        res.status(200).send('Nouvelles données ajoutées avec succès');
    } catch (err) {
        res.status(500).send(`Erreur lors de l'ajout des nouvelles données de l'entreprise.`);
        console.log(err);
    }
});

//---------------- Update Maintenance by ID Method
router.patch('/updateMaintenance/:_id', isAuthenticated, async (req, res) => {
    try {
        const updatedCompany = await Company.findOneAndUpdate(
            { maintenance: { $elemMatch: { _id: req.params._id } } },
            {
                $set: {
                    "maintenance.$.name_maintenance": req.body.name_maintenance,
                    "maintenance.$.description_maintenance": req.body.description_maintenance
                }
            },
            { new: true }
        );
        res.status(200).send('Mise à jour des données de maintenance réussie');
    } catch (err) {
        console.log(err);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour des données de maintenance.");
    }
});

//---------------- Update Hébergement by ID Method
router.patch('/updateHosting/:_id', isAuthenticated, async (req, res) => {
    try {
        const updatedCompany = await Company.findOneAndUpdate(
            { hosting: { $elemMatch: { _id: req.params._id } } },
            {
                $set: {
                    "hosting.$.name_hosting": req.body.name_hosting,
                    "hosting.$.description_hosting": req.body.description_hosting,
                    "hosting.$.ipv4": req.body.ipv4,
                    "hosting.$.ipv6": req.body.ipv6
                }
            },
            { new: true }
        );
        res.status(200).send("Mise à jour des données de l'hébergement réussie");
    } catch (err) {
        console.log(err);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour des données de l'hébergement.");
    }
});

//---------------- Update Mail by ID Method
router.patch('/updateMail/:_id', isAuthenticated, async (req, res) => {
    try {
        const updatedCompany = await Company.findOneAndUpdate(
            { mail: { $elemMatch: { _id: req.params._id } } },
            {
                $set: {
                    "mail.$.mail": req.body.mail,
                    "mail.$.description_mail": req.body.description_mail
                }
            },
            { new: true }
        );
        res.status(200).send('Mise à jour des données du mail réussie');
    } catch (err) {
        console.log(err);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour des données du mail.");
    }
});

//---------------- Update Domain by ID Method
router.patch('/updateDomain/:_id', isAuthenticated, async (req, res) => {
    try {
        const updatedCompany = await Company.findOneAndUpdate(
            { domainName: { $elemMatch: { "extensions._id": req.params._id } } },
            {
                $set: {
                    "domainName.$.extensions.$[inner].name_extension": req.body.name_extension,
                    "domainName.$.extensions.$[inner].googleIndex": req.body.googleIndex,
                    "domainName.$.extensions.$[inner].yahooIndex": req.body.yahooIndex,
                    "domainName.$.extensions.$[inner].bingIndex": req.body.bingIndex
                }
            },
            { new: true, arrayFilters: [{ "inner._id": req.params._id }] }
        );

        res.status(200).json(updatedCompany);
    } catch (err) {
        console.log(err);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour des données de maintenance.");
    }
});

//---------------- Update Domain by ID Method
router.patch('/editDomain/:_id', isAuthenticated, async (req, res) => {
    try {
        const updatedCompany = await Company.findOneAndUpdate(
            { domainName: { $elemMatch: { _id: req.params._id } } },
            {
                $set: {
                    "domainName.$[inner].name_domain": req.body.name_domain,
                    "domainName.$[inner].tags": req.body.tags,
                    "activity": req.body.activity
                }
            },
            {
                new: true,
                arrayFilters: [
                    { "inner._id": req.params._id }
                ]
            }
        );
        res.status(200).json(updatedCompany);
    } catch (err) {
        console.log(err);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour des données de maintenance.");
    }
});

//---------------- Delete by NAME Method
router.delete('/deleteCompany/:name_company', isAuthenticated, async (req, res) => {
    try {
        const company = await Company.findOneAndDelete({ name_company: req.params.name_company });
        if (!company) {
            return res.status(404).send("L'entreprise demandée n'a pas été trouvée");
        }
        res.send("L'entreprise a été supprimée avec succès");
    } catch (error) {
        res.status(500).send(error);
    }
});

//---------------- Delete Mail by ID Method
router.delete('/deleteMail/:_id', isAuthenticated, async (req, res) => {
    try {
        const result = await Company.findOneAndUpdate(
            { "mail._id": req.params._id },
            { $pull: { mail: { _id: req.params._id } } }
        );
        console.log(result);
        if (result) {
            res.status(200).send('Mail supprimé avec succès');
        } else {
            res.status(404).send('Mail non trouvé');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Une erreur s'est produite lors de la suppression du mail.");
    }
});

//---------------- Delete Maintenance by ID Method
router.delete('/deleteMaintenance/:_id', isAuthenticated, async (req, res) => {
    try {
        const result = await Company.findOneAndUpdate(
            { "maintenance._id": req.params._id },
            { $pull: { maintenance: { _id: req.params._id } } }
        );
        if (result) {
            res.status(200).send('Maintenance supprimée avec succès');
        } else {
            res.status(404).send('Maintenance non trouvée');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Une erreur s'est produite lors de la suppression de la maintenance.");
    }
});

//---------------- Delete Domain by ID Method
router.delete('/deleteDomain/:_id', isAuthenticated, async (req, res) => {
    try {
        const result = await Company.findOneAndUpdate(
            { "domainName._id": req.params._id },
            { $pull: { domainName: { _id: req.params._id } } }
        );
        if (result) {
            res.status(200).send('Domaine supprimé avec succès');
        } else {
            res.status(404).send('Domaine non trouvé');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Une erreur s'est produite lors de la suppression du domaine.");
    }
});

//---------------- Delete Extension by ID Method
router.delete('/deleteExtension/:_id', isAuthenticated, async (req, res) => {
    try {
        const result = await Company.findOneAndUpdate(
            { domainName: { $elemMatch: { "extensions._id": req.params._id } } },
            { $pull: { "domainName.$[].extensions": { _id: req.params._id } } },
            { new: true }
        );
        if (result) {
            res.status(200).send('Extension supprimée avec succès');
        } else {
            res.status(404).send('Extension non trouvée');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Une erreur s'est produite lors de la suppression de l'extension.");
    }
});

router.delete('/delete', isAuthenticated, async (req, res) => {
    try {
        const data = await Company.deleteMany();
        res.send('Tout a été supprimé')
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

