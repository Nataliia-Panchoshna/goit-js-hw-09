const form = document.querySelector('form');
const STORAGE_KEY = 'feedback-form-state';

const formData = { email: '', message: '' };

const saveFormState = () => { 
    formData.email = form.elements.email.value.trim();
    formData.message = form.elements.message.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const loadFormState = () => { 
    try { 
        const saveData = localStorage.getItem(STORAGE_KEY);
        if (saveData) {
            Object.assign(formData, JSON.parse(saveData));
            form.elements.email.value = formData.email;
            form.elements.message.value = formData.message;
        }
    } catch (error) { 
        console.log('Спіймав помилку: ', error); 
    }
};

form.addEventListener('input', (event) => {
    formData[event.target.name] = event.target.value.trim();
    saveFormState();
});

form.addEventListener('submit', (e) => { 
    e.preventDefault();

    if (!formData.email || !formData.message) {
        alert('Please fill in both fields!');
        return;
    }

    console.log(formData);

    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    formData.email = '';
    formData.message = '';
});

loadFormState();
