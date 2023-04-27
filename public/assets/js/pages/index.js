
window.addEventListener("load", () => {
    // DOM
    let photographerSection = document.querySelector('.photographer_section');

    // initialize the PhotographerFactory and execute the main method to get the data
    // eslint-disable-next-line no-undef
    let photographerFactory = new PhotographerFactory();
    let data = photographerFactory.main();

    data.then((res) => {
        res.forEach(photographer => {
            photographerSection.innerHTML += photographer.templatePhotographerCard();
        });
    });

}, false);