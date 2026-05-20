-- portfolio_fotografia.sql
-- Estructura de base de datos para el Portfolio de FotografÃ­a
-- Ejecutar en MySQL Workbench o phpMyAdmin

CREATE DATABASE IF NOT EXISTS portfolio_fotografia
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE portfolio_fotografia;

-- 1. Usuarios del sistema (admin/editor)
CREATE TABLE IF NOT EXISTS usuarios (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  nombre       VARCHAR(100) NOT NULL,
  email        VARCHAR(150) NOT NULL UNIQUE,
  contrasena   VARCHAR(255) NOT NULL,  -- hash scrypt
  rol          ENUM('ADMIN','EDITOR') DEFAULT 'EDITOR',
  creado_en    DATETIME DEFAULT CURRENT_TIMESTAMP,
  actualizado  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. CategorÃ­as de proyectos
CREATE TABLE IF NOT EXISTS categorias (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  nombre       VARCHAR(100) NOT NULL UNIQUE,
  descripcion  TEXT,
  slug         VARCHAR(110) NOT NULL UNIQUE
);

-- 3. Proyectos fotogrÃ¡ficos
CREATE TABLE IF NOT EXISTS proyectos (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  titulo          VARCHAR(200) NOT NULL,
  descripcion     TEXT,
  imagen_portada  VARCHAR(500),
  fecha           DATE,
  publicado       TINYINT(1) DEFAULT 0,
  categoria_id    INT,
  creado_en       DATETIME DEFAULT CURRENT_TIMESTAMP,
  actualizado     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_proyecto_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- 4. Fotos (imÃ¡genes dentro de cada proyecto)
CREATE TABLE IF NOT EXISTS fotos (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  titulo       VARCHAR(200),
  url          VARCHAR(500) NOT NULL,
  descripcion  TEXT,
  orden        INT DEFAULT 0,
  proyecto_id  INT NOT NULL,
  creado_en    DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_foto_proyecto
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- 5. Etiquetas
CREATE TABLE IF NOT EXISTS etiquetas (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL UNIQUE,
  slug   VARCHAR(90) NOT NULL UNIQUE
);

-- 6. RelaciÃ³n N:M fotos <-> etiquetas
CREATE TABLE IF NOT EXISTS foto_etiqueta (
  foto_id     INT NOT NULL,
  etiqueta_id INT NOT NULL,
  PRIMARY KEY (foto_id, etiqueta_id),
  CONSTRAINT fk_fe_foto
    FOREIGN KEY (foto_id) REFERENCES fotos(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_fe_etiqueta
    FOREIGN KEY (etiqueta_id) REFERENCES etiquetas(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- =============================================
-- DATOS DE EJEMPLO
-- =============================================
INSERT INTO categorias (nombre, descripcion, slug) VALUES
  ('Retrato',       'FotografÃ­a de personas y expresiÃ³n',           'retrato'),
  ('Naturaleza',    'Paisajes y fauna silvestre',                   'naturaleza'),
  ('Arquitectura',  'Edificios, estructuras y espacios urbanos',    'arquitectura'),
  ('Reportaje',     'DocumentaciÃ³n de eventos y momentos sociales', 'reportaje');

-- ContraseÃ±a: "admin1234" (deberÃ¡s hashear con scrypt en el Paso 5)
INSERT INTO usuarios (nombre, email, contrasena, rol) VALUES
  ('Administrador', 'admin@portfolio.com', 'hash_pendiente', 'ADMIN'),
  ('Editor',        'editor@portfolio.com','hash_pendiente', 'EDITOR');

INSERT INTO proyectos (titulo, descripcion, imagen_portada, fecha, publicado, categoria_id) VALUES
  ('Luces de Ciudad',   'Serie nocturna sobre vida urbana',       'https://picsum.photos/seed/lc/800/600', '2024-01-15', 1, 3),
  ('Bosque en OtoÃ±o',   'Colores y texturas del bosque atlÃ¡ntico','https://picsum.photos/seed/bo/800/600', '2024-03-10', 1, 2),
  ('Rostros del Sur',   'Retratos de artesanos andaluces',        'https://picsum.photos/seed/rs/800/600', '2024-05-20', 1, 1);

INSERT INTO fotos (titulo, url, orden, proyecto_id) VALUES
  ('Calle mojada',     'https://picsum.photos/seed/f1/600/400', 1, 1),
  ('NeÃ³n reflejo',     'https://picsum.photos/seed/f2/600/400', 2, 1),
  ('Hoja caÃ­da',       'https://picsum.photos/seed/f3/600/400', 1, 2),
  ('Luz entre Ã¡rboles','https://picsum.photos/seed/f4/600/400', 2, 2),
  ('Alfarero',         'https://picsum.photos/seed/f5/600/400', 1, 3);

INSERT INTO etiquetas (nombre, slug) VALUES
  ('nocturna',   'nocturna'),
  ('urbana',     'urbana'),
  ('naturaleza', 'naturaleza'),
  ('retrato',    'retrato');

INSERT INTO foto_etiqueta (foto_id, etiqueta_id) VALUES
  (1, 1), (1, 2),
  (2, 1), (2, 2),
  (3, 3),
  (4, 3),
  (5, 4);

-- 7. Mensajes de contacto
CREATE TABLE IF NOT EXISTS mensajes (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nombre    VARCHAR(100) NOT NULL,
  email     VARCHAR(150) NOT NULL,
  asunto    VARCHAR(200),
  mensaje   TEXT NOT NULL,
  estado    ENUM('nuevo','leido','respondido') DEFAULT 'nuevo',
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO mensajes (nombre, email, asunto, mensaje, estado, creado_en) VALUES
  ('María García',    'maria@ejemplo.com',   'Sesión de fotos de boda',   'Hola, me gustaría saber más sobre tus paquetes para bodas para el próximo otoño.',              'nuevo',      '2024-11-01 10:30:00'),
  ('Carlos Martínez', 'carlos@empresa.es',   'Reportaje corporativo',     'Necesitamos fotografías para el informe anual de nuestra empresa. ¿Podemos hablar?',            'leido',      '2024-11-05 16:45:00'),
  ('Laura Pérez',     'laura.perez@gmail.com', NULL,                      '¡Me encanta tu trabajo de naturaleza! ¿Vendes prints?',                                          'respondido', '2024-11-10 09:15:00');