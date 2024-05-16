// Fonction pour initialiser le carousel de témoignages
function initTestimonialsCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const nextSlide = () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    };
    setInterval(nextSlide, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'https://api.openapi.com/v1/exchange'; // Remplacez par l'URL de l'API correcte
    const API_TOKEN = 'votre_token_d_acces'; // Remplacez par votre token d'accès

    // Fonction pour récupérer les taux de change
    async function getExchangeRates() {
        try {
            const response = await axios.get(API_URL, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`
                }
            });
            // Exemple de structure de réponse : { "rates": { "USD/GNF": [9800, 8700, 9400, 9000, 9600] } }
            return response.data.rates['USD/GNF'];
        } catch (error) {
            console.error('Erreur lors de la récupération des taux de change:', error);
            return [9800, 8700, 9400, 9000, 9600]; // Valeurs par défaut en cas d'erreur
        }
    }

    // Initialisation du graphique
    async function initChart() {
        const exchangeRates = await getExchangeRates();
        const data = {
            labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
            datasets: [{
                label: 'Taux de Change USD/GNF',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
                data: exchangeRates
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Jour de la semaine'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Taux de Change'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    }
                }
            }
        };

        const ctx = document.getElementById('exchangeRateChart').getContext('2d');
        new Chart(ctx, config);
    }

    // Initialisation du graphique
    initChart();
});