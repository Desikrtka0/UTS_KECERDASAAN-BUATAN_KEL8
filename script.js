// Data dummy buku dengan sub-buku
let books = [
    {
        title: "Pemrograman Python", 
        image: "img/Python.jpg", 
        subBooks: [
            { title: "Advanced Python", image: "img2/advanced.jpg" },
            { title: "Python for Data Science", image: "img2/Python.jpg" },
            { title: "Python Automation", image: "img2/python automation.jpg" },
            { title: "Django Web Development", image: "img2/django.jpg" }
        ]
    },
    {
        title: "Java: Dasar-Dasar Pemrograman", 
        image: "img/java.jpg",
        subBooks: [
            { title: "Advanced Java", image: "img2/advancedjava.jpg" },
            { title: "Spring Framework", image: "img2/springframework.jpg" },
            { title: "Java for Mobile", image: "img2/javamobile.jpg" },
            { title :"java for game",image:"img2/javaforgame.jpg"}
        ]
    },
    {
        title: "Dasar Pemograman Web ", 
        image: "img/Pemogramanweb.jpg", 
        subBooks: [
            { title: "HTML5", image: "img2/html5.jpg" },
            { title: "CSS ", image: "img2/css.jpg" },
            { title: "Bootstrap untuk Pemula", image: "img2/bootstrap.jpg" },
            { title: "JavaScript Dasar", image: "img2/javascript.jpg" },
        ]
    },
    {
        title: "Dasar-Dasar Basis Data", 
        image: "img/basis data.jpg", 
        subBooks: [
            { title: "SQL untuk Pemula", image: "img2/SQL.jpg" },
            { title: " MongoDB", image: "img2/MongoDB.jpg" },
            { title: "Desain Basis Data", image: "img2/Database.jpg" },
            { title: "Administrasi Basis Data", image: "img2/Administrasidata.jpg" },

        ]
    },
    {
        title: "Pengembangan Aplikasi Mobile", 
        image: "img/apkmobile.jpg", 
        subBooks: [
            { title: "Android untuk Pemula", image: "img2/Androidpemula.jpg" },
            { title: "iOS Development", image: "img/ios_development.jpg" },
            { title: "Flutter untuk Mobile", image: "img/flutter_mobile.jpg" },
            { title: "React Native", image: "img/react_native.jpg" },
           
        ]
    },
    {
        title: "Kecerdasan Buatan dan Machine Learning", 
        image: "img/Kecerdasanbuatan.jpg", 
        subBooks: [
            { title: "Pengantar Kecerdasan Buatan", image: "img2/PengatarKecerdasanbuatan.jpg" },
            { title: "Machine Learning dengan Python", image: "img2/" },
            { title: "Deep Learning", image: "img2/" },
            { title: "Natural Language Processing", image: "img2" },
            
        ]
    }
];

// Fungsi login

function login() {
    // Mengambil nilai username dan password dari input form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Mengecek kredensial
    if (username === 'DDS' && password === '1234') {
        // Menyembunyikan form login dan menampilkan dashboard
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        // Menampilkan daftar buku
        displayBooks(books);
    } else {
        // Menampilkan alert jika login gagal
        alert('Username atau password salah!');
        
    }
}
// Fungsi untuk menampilkan Card Member
function showMemberCard() {
    document.getElementById('member-card').classList.remove('hidden');
    document.getElementById('book-management').classList.add('hidden'); // Menyembunyikan daftar buku
    document.getElementById('sub-books').classList.add('hidden'); // Menyembunyikan sub-buku jika terbuka
}

// Fungsi menampilkan buku dalam bentuk grid
function displayBooks(bookList) {
    const bookGrid = document.getElementById('book-grid');
    const noBooksMessage = document.getElementById('no-books-message');
    
    bookGrid.innerHTML = ''; // Membersihkan grid sebelum menampilkan buku baru
    
    if (bookList.length === 0) {
        // Menampilkan pesan jika tidak ada buku
        noBooksMessage.classList.remove('hidden');
    } else {
        // Menyembunyikan pesan jika ada buku
        noBooksMessage.classList.add('hidden');
        
        bookList.forEach(book => {
            // Membuat elemen card untuk setiap buku
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
            `;
            // Menambahkan event listener untuk menampilkan sub-buku saat card diklik
            bookCard.onclick = () => displaySubBooks(book.subBooks);
            bookGrid.appendChild(bookCard); // Menambahkan card ke grid buku
        });
    }
}

// Fungsi BFS untuk pencarian buku
function searchBooks() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const result = []; // Array untuk menyimpan hasil pencarian

    // Melakukan pencarian di buku dan sub-buku
    books.forEach(book => {
        if (book.title.toLowerCase().includes(query)) {
            result.push(book); // Menambahkan buku yang cocok ke hasil
        } else {
            book.subBooks.forEach(subBook => {
                if (subBook.title.toLowerCase().includes(query)) {
                    result.push(book); // Menambahkan buku induk jika sub-buku cocok
                }
            });
        }
    });

    // Menampilkan hasil pencarian
    displayBooks(result);
}

// Fungsi menampilkan sub-buku
function displaySubBooks(subBooks) {
    const subBookGrid = document.getElementById('sub-book-grid');
    const subBooksContainer = document.getElementById('sub-books');
    
    subBookGrid.innerHTML = ''; // Membersihkan tampilan sub-buku sebelumnya
    subBooksContainer.classList.remove('hidden'); // Menampilkan container sub-buku

    subBooks.forEach(subBook => {
        // Membuat elemen card untuk setiap sub-buku
        const subBookCard = document.createElement('div');
        subBookCard.className = 'sub-book-card';
        subBookCard.innerHTML = `
            <img src="${subBook.image}" alt="${subBook.title}">
            <h4>${subBook.title}</h4>
        `;
        subBookGrid.appendChild(subBookCard); // Menambahkan card ke grid sub-buku
    });
}

// Fungsi menutup tampilan sub-buku
function hideSubBooks() {
    document.getElementById('sub-books').classList.add('hidden'); // Menyembunyikan container sub-buku
}

// Fungsi logout
function logout() {
    // Menampilkan kembali form login dan menyembunyikan dashboard
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    // Menghapus nilai input
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('search-input').value = '';
    document.getElementById('book-grid').innerHTML = ''; // Menghapus buku yang ditampilkan
    document.getElementById('no-books-message').classList.add('hidden'); // Menyembunyikan pesan tidak ada buku
}
