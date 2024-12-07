const express = require('express');
const bodyParser = require('body-parser');

const stripe = require('stripe')('sk_test_51QSvskJkwjLflwgyiqtOmRN00a0MjasG4dBP0Pth6j8I57xvWoTUs5aLkzjf5ks3qIMpktxgivn0xFHqrKJurHFD00h1QUdmLa');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'produit.html'));
});

// Route pour créer une session de paiement
app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Produit Exemple',
                        },
                        unit_amount: 2000, // Montant en cents (20.00 USD)
                    },
                    quantity: 1,
                },
            ],
            success_url: 'http://localhost:3000/success.html',
            cancel_url: 'http://localhost:3000/cancel.html',
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Démarrer le serveur
app.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));
