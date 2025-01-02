window.onload = function() {
    if (!localStorage.getItem('yash_id_sell')) {
        window.location.href = 'login.html';
    }
}
