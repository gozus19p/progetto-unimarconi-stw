/*
 * Elenco di script Javascript atti a definire le funzionalità relative alla verifica e validazione della lunghezza dei
 * campi della form.
 *
 * @author Manuel Gozzi
 */

/**
 * Funzione che verifica l'input relativo al nome, accertandosi che la sua lunghezza sia al massimo pari a 25
 * caratteri.
 */
function verifyNameInput() {
    checkFieldMaxLength('nome-input', 25, 'nome-invalid-div', 'La lunghezza del nome non deve superare i 25 caratteri.');
}

/**
 * Funzione che verifica l'input relativo al cognome, accertandosi che la sua lunghezza sia al massimo pari a 30
 * caratteri.
 */
function verifySurnameInput() {
    checkFieldMaxLength('cognome-input', 30, 'cognome-invalid-div', 'La lunghezza del cognome non deve superare i 30 caratteri.');
}

/**
 * Funzione che verifica l'input relativo all'e-mail, accertandosi che la sua lunghezza sia al massimo pari a 30
 * caratteri (la validità del formato dell'e-mail viene verificata nativamente nella collaborazione tra HTML5
 * e Bootstrap, tramite l'apposizione del valore "email" sull'attributo "type" dell'input relativo proprio
 * all'e-mail).
 */
function verifyEmailInput() {
    checkFieldMaxLength('email-input', 30, 'email-invalid-div', 'La lunghezza dell\'e-mail non deve superare i 30 caratteri.');
}

/**
 * Funzione che verifica che un generico input (identificato da un id preposto) non superi una certa dimensione
 * fissata in numero di caratteri).
 *
 * @param fieldId è l'id HTML che identifica l'input
 * @param maxlength è la lunghezza massima dei caratteri, espressa in numero intero
 * @param divId è l'id HTML del div responsabile della restituzione del messaggio d'errore
 * @param errorMessage è il messaggio d'errore che si intende stampare in caso di superamento della dimensione
 *        massima
 */
function checkFieldMaxLength(fieldId, maxlength, divId, errorMessage) {

    // Recupero il riferimento all'input richiesto
    let field = document.getElementById(fieldId);

    // Recupero il valore inserito all'interno dell'input
    let value = field.value;

    // Verifico la dimensione, in caratteri, dell'input
    if (value.length >= maxlength) {

        // Inserisco l'errore di validazione
        document.getElementById(divId).innerText = errorMessage;
        field.setCustomValidity(errorMessage);
    } else {

        /*
         * Reimposto il messaggio d'errore predefinito e rimuovo l'eventuale errore di validazione
         * precedentemente impostato.
         */
        document.getElementById(divId).innerText = 'Campo obbligatorio.';
        field.setCustomValidity('');
    }
}