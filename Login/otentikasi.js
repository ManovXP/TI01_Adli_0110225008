function login()  {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username == "admin" && password == "admin123") {
        alert('Anda Berhasil Login');
        window.location="home.html"
        return false;
    }
    else if(username=="" || password==""){
        alert('Username dan Password tidak boleh kosong!')
    }
    else{
        alert('Username atau Password yang Anda masukkan salah!')
    }
}