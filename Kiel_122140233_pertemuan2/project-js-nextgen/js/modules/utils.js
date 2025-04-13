export const displayDateTime = () => {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();
    
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    dateTimeElement.textContent = now.toLocaleDateString('id-ID', options);
};

export const showElement = (element) => {
    element.style.display = 'flex';
};

export const hideElement = (element) => {
    element.style.display = 'none';
};

export const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};