CREATE DATABASE musetix;
USE musetix;

-- Tabel kategori
CREATE TABLE kategori (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    jenis VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel harga
CREATE TABLE harga (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    harga_tiket BIGINT NOT NULL
);

-- Tabel acara
CREATE TABLE acara (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    judul VARCHAR(255) NOT NULL,
    img VARCHAR(255),
    deskripsi LONGTEXT,
    tgl DATE,
    jam_mulai TIME,
    jam_selesai TIME,
    komunitas VARCHAR(255) NOT NULL,
    jumlah_tiket BIGINT DEFAULT 0,
    tgl_jual_mulai DATE,
    tgl_jual_akhir DATE,
    jam_jual_mulai TIME,
    jam_jual_akhir TIME,
    min_beli BIGINT DEFAULT 1,
    max_beli BIGINT DEFAULT 1,
    tempat_duduk BIGINT,
    id_kategori BIGINT NULL,
    id_harga BIGINT NULL,
    FOREIGN KEY (id_kategori) REFERENCES kategori(id) ON DELETE SET NULL,
    FOREIGN KEY (id_harga) REFERENCES harga(id) ON DELETE SET NULL
);


-- Tabel profil
CREATE TABLE profil (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    img VARCHAR(255)
);

-- Tabel tiketku
CREATE TABLE tiketku (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_acara BIGINT NULL,
    id_profil BIGINT NULL,
    nama VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_acara) REFERENCES acara(id) ON DELETE SET NULL,
    FOREIGN KEY (id_profil) REFERENCES profil(id) ON DELETE SET NULL
);

-- Insert into Categories
INSERT INTO kategori (jenis) 
VALUES 
    ('Konser'),
    ('Orkestra'),
    ('Teater');

-- Insert into Categories
INSERT INTO profil (nama, email, img) 
VALUES 
    ('admin', 'admin@gmail.com','img admin');


-- -- Insert into Categories
-- INSERT INTO categories (slug, name) 
-- VALUES 
--     ('makanan-minuman', 'Makanan & Minuman'),
--     ('perawatan-kecantikan', 'Perawatan & Kecantikan'),
--     ('buku-alat-tulis', 'Buku & Alat Tulis');

-- -- Insert into Products
-- INSERT INTO products (slug, name, category_id, price, stock, description)
-- VALUES
--     ('nabati-richeese-122gr-x3', 'NABATI Richeese 122gr bundle 3', 1, 26000, 500, 
--     '<p class="description-text">Nabati Wafer Richeese: Wafer Renyah, Krim Keju Berlimpah.
--     Kombinasi sempurna antara renyahnya wafer dan krim keju Richeese signature flavor Nabati yang berlimpah. 
--     Dibuat dengan bahan-bahan berkualitas tinggi, Nabati Richeese Wafer diperkaya dengan vitamin A, B1, B2, B6, dan B12. 
--     Setiap gigitan membuat kamu lebih bersemangat!</p>'),
    
--     ('Nextar-Star-Double-Richoco-84g', 'Nextar Star Double Richoco 84g', 1, 9000, 2000, 
--     '<p class="description-text">Mencari sumber semangat untuk setiap aktivitasmu? Nextar Star Double Richoco adalah jawabannya! 
--     Dengan star-shape kukis yang unik, terletak kelezatan dalam setiap gigitan. Double cream-nya yang lezat dan melimpah, 
--     Nextar Double Richoco adalah kombinasi yang sempurna antara kukis tekstur renyah dan rasa double cream Richoco yang lezat. 
--     Cokelatnya bikin semangatmu naik terus!</p>'),
    
--     ('PANTENE-GOLD-SERIES-SHAMPOO-125-ML', 'PANTENE GOLD SERIES SHAMPOO 125 ML', 2, 20000, 100, 
--     '<p class="description-text">Pantene Pro-V Gold Series Smooth & Sleek Sampo merupakan shampo yang mengandung Vitamin B3, Pro-V, 
--     Anti-Oxidant dapat membuat rambut lembut sepanjang hari dan membantu menjaga kekuatan rambut sehingga rambut fleksibel dan
--     tidak mudah patah. Gunakan Pantene Kondisioner untuk rambut yang lembut dan mudah diatur.</p>'),
    
--     ('Semua-Ada-Prosesnya-Rendy-Arianto', 'Semua Ada Prosesnya - Rendy Arianto', 3, 87000, 50, 
--     '<p class="description-text">Disadari atau tidak, hampir semua orang pernah membandingkan dirinya dengan orang lain.
--     Kebiasaan ini sering disebut dengan social comparison atau perbandingan sosial. Terkadang, ini bisa menginspirasi 
--     dan menyadarkan segala kekurangan yang dimiliki, sehingga memicu diri untuk memperbaikinya dan menjadi lebih baik. 
--     Tetapi, membandingkan diri dengan orang lain tidak lagi menjadi hal yang baik ketika orang lain dijadikan standar 
--     kualitas hidup. Bahkan, terlalu banyak membandingkan justru bisa menyebabkan hilangnya identitas diri kita, 
--     memicu perasaan iri, menurunkan rasa percaya diri, dan menghambat potensi diri.</p>');

