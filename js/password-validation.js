// Elenco di script Javascript atti a definire le funzionalità relative alla verifica e validazione della password.

/**
 * Funzione che verifica la validità della password, assicurandosi anche della relativa corrispondenza con il
 * campo "Conferma password".
 *
 * @author Manuel Gozzi
 */
function verifyPassword() {

    // Recupero i riferimenti ad input e valori dei campi "Password" e "Conferma password"
    let passwordInput = document.getElementById('password-input');
    let passwordConfirmationInput = document.getElementById('conferma-password-input');
    let passwordInputValue = passwordInput.value;
    let passwordConfirmationValue = passwordConfirmationInput.value;

    // Variabile che identifica la presenza simultanea della password e della sua conferma
    let missingInput = false;

    // Verifico che la conferma della password sia stata fornita, viceversa segnalo il problema all'utente
    if (passwordConfirmationValue === null || passwordConfirmationValue === "") {
        document.getElementById('conferma-password-invalid-div').innerText = 'Campo obbligatorio.';
        missingInput = true;
    }

    // Verifico che la password sia stata inserita dall'utente, viceversa segnalo il problema
    if (passwordInputValue === null || passwordInputValue === "") {
        document.getElementById('password-invalid-div').innerText = 'Campo obbligatorio.';
        missingInput = true;
    }

    /*
     * Se non mancano degli input, se ho a disposizione sia la password che la sua conferma, procedo a
     * verificare la struttura della password.
     */
    if (!missingInput) {

        // Verifico la corrispondenza tra input e conferma
        checkCorrespondenceBetweenInputAndConfirmation(passwordInputValue, passwordConfirmationValue, passwordConfirmationInput, 'conferma-password-invalid-div');

        // Verifico la struttura della sintassi della password
        checkPasswordSyntax(passwordInput, 'password-invalid-div');
    }
}

/**
 * Metodo che verifica la corrispondenza dell'input della password con la relativa sua conferma.
 *
 * @param passwordInputValue è il valore contenuto nell'input relativo alla password
 * @param passwordConfirmationValue è il valore contenuto nell'input relativo alla conferma della password
 * @param passwordConfirmationInput è l'input relativo alla conferma della password digitata
 * @param invalidDivId è l'id che identifica il div HTML responsabile di sollevare l'errore di validazione
 */
function checkCorrespondenceBetweenInputAndConfirmation(passwordInputValue, passwordConfirmationValue, passwordConfirmationInput, invalidDivId) {

    // Se la password inserita non corrisponde alla sua conferma, si segnala il problema
    if (passwordInputValue !== passwordConfirmationValue) {
        let message = "La password digitata deve corrispondere alla password digitata precedentemente."
        passwordConfirmationInput.setCustomValidity(message);
        document.getElementById(invalidDivId).innerText = message;
    } else {

        // Altrimenti la conferma della password supera i controlli
        passwordConfirmationInput.setCustomValidity('');
    }
}

/**
 * Funzione che verifica la corretta sintassi sulla password inserita dall'utente.
 *
 * @param passwordInput è l'input relativo alla password
 * @param invalidDivId è l'id che identifica il div HTML responsabile di sollevare l'errore di validazione
 */
function checkPasswordSyntax(passwordInput, invalidDivId) {

    /*
     * Verifico la struttura della password (booleano):
     * 1. una password deve contenere almeno 8 caratteri, verifico il valore del campo "length" del
     *    contenuto dell'input;
     * 2. una password deve contenere almeno una lettera minuscola, verifico, tramite espressione regolare,
     *    che sia presente almeno un carattere compreso tra a-z, in qualsiasi punto della stringa;
     * 3. una password deve contenere almeno una lettera maiuscola, verifico, tramite espressione regolare,
     *    che sia presente almeno un carattere compreso tra A-Z, in qualsiasi punto della stringa;
     * 4. una password deve contenere almeno un numero, verifico, tramite espressione regolare, che sia
     *    presente almeno una cifra (0-9), in qualsiasi punto della stringa.
     */
    let atLeast8Characters = passwordInput.value.length >= 8;
    let atLeastOneLowercaseLetter = /.*?[a-z].*?/.test(passwordInput.value);
    let atLeastOneUppercaseLetter = /.*?[A-Z].*?/.test(passwordInput.value);
    let atLeastOneNumber = /.*?[0-9].*?/.test(passwordInput.value);

    // Se non si verificano tutte e 4 le condizioni contemporaneamente, la validazione della password fallisce
    if (!(atLeast8Characters && atLeastOneLowercaseLetter && atLeastOneUppercaseLetter && atLeastOneNumber)) {

        let message = "La password deve contenere almeno 8 caratteri, una lettera maiuscola, una minuscola e un numero.";
        passwordInput.setCustomValidity(message)
        document.getElementById(invalidDivId).innerText = message;
    } else {

        // Altrimenti la password si considera valida
        passwordInput.setCustomValidity('');
    }
}
