const form = document.querySelector('form');
const STORAGE_KEY = 'feedback-form-state';

const emailInput = form.elements.email;

emailInput.addEventListener("focus", () => {
    emailInput.placeholder = "Type area";
});

emailInput.addEventListener("blur", () => {
    emailInput.placeholder = "";
});
    
const saveFormState = () => { 
    const formData = {
        email: form.elements.email.value.trim(),
        message: form.elements.message.value.trim(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const loadFormState = () => { 
    try { 
        const saveData = localStorage.getItem(STORAGE_KEY);
        if (saveData) {
            const { email, message } = JSON.parse(saveData);
            form.elements.email.value = email ?? '';
            form.elements.message.value = message ?? '';
        }
    }
    catch (error) { console.log('Спіймав помилку: ', error); };
};

form.addEventListener('input', saveFormState);
form.addEventListener('submit', e => { 
    e.preventDefault();

    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    if (!email || !message) {
        alert('Please fill in both fields!');
        return;
    }

    console.log({ email, message });

    localStorage.removeItem(STORAGE_KEY);
    form.reset();
});


loadFormState();
