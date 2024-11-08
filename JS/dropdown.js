document.addEventListener('DOMContentLoaded', function() {
    var dropdown = document.querySelector('.dropdown');
    var dropdownContent = document.querySelector('.dropdown-content');
    var dropbtn = document.querySelector('.dropbtn');

    dropbtn.addEventListener('click', function() {
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
            dropdownContent.style.opacity = '0';
            dropdownContent.style.maxHeight = '0';
        } else {
            dropdownContent.style.display = 'block';
            dropdownContent.style.animation = 'rollDown 0.5s ease-in-out forwards';
            dropdownContent.style.opacity = '1';
            dropdownContent.style.maxHeight = '500px'; 
        }
    });

    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropbtn')) {
            dropdownContent.style.display = 'none';
            dropdownContent.style.opacity = '0';
            dropdownContent.style.maxHeight = '0';
        }
    });
});