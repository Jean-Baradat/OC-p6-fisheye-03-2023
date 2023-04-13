window.addEventListener("load", () => {
    // DOM --------------------------------------------------------------------------
    const btnOpenModal = document.querySelector('.btn-open-modal');
    const btnCloseModal = document.querySelector('.btn-close-modal');
    const html = document.querySelector('html');
    const formContactForm = document.querySelector('form[name="contact-form"]');
    const messErrFirstname = document.querySelector('#mess-err-firstname');
    const messErrLastname = document.querySelector('#mess-err-lastname');
    const messErrEmail = document.querySelector('#mess-err-email');


    // VARIABLES ---------------------------------------------------------------------
    // Regular expressions
    const regexFullName = /^(?!.*(?:--|''))[A-Za-zÀ-ÖØ-öø-ſ ]{2,}(?:[-' ]{1,}[A-Za-zÀ-ÖØ-öø-ſ ]+)*$/;
    const regexMail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    // Contact form fields
    const contactFormfields = [
        {
            name: 'firstname',
            regex: regexFullName,
        },
        {
            name: 'lastname',
            regex: regexFullName,
        },
        {
            name: 'email',
            regex: regexMail,
        },
    ];

    // EVENT ------------------------------------------------------------------------
    btnOpenModal.addEventListener('click', displayModal);
    btnCloseModal.addEventListener('click', closeModal);
    formContactForm.addEventListener('submit', submitContactForm);


    // FUNCTIONS --------------------------------------------------------------------
    function displayModal() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "flex";
        html.style.position = 'fixed';
    }

    function closeModal() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";
        html.style.position = 'relative';
    }

    function submitContactForm(e) {
        e.preventDefault();

        // get the form data
        const formData = new FormData(formContactForm);
        const data = Object.fromEntries(formData.entries());

        // check if the data is valid
        const errors = [];
        for (const field of contactFormfields) {
            document.querySelector(`#mess-err-${field.name}`).style.visibility = 'hidden';
            if (!field.regex.test(data[field.name])) {
                errors.push(`${field.name}`);
            }
        }
        if (errors.length > 0) {
            // if there are errors
            errors.forEach(error => {
                document.querySelector(`#mess-err-${error}`).style.visibility = 'visible';
            });
            return false;
        } else {
            // if the form is valid
            console.log(`Le formulaire est valide : ${JSON.stringify(data, null, 2)}`);
        }
    }
}, false);

