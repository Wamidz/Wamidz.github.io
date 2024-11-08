// Event listener for DOMContentLoaded to initialize dropdown functionality
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dropbtn').forEach((dropbtn) => {
        document.querySelectorAll('.dropdown-content').forEach(function(element) {
            element.classList.toggle('show');
        });
        document.querySelector('.dropdown-content').classList.toggle('show');
    });
});