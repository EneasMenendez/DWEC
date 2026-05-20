-- ============================================================
-- portfolio_fotografia.sql
-- Importar en HeidiSQL: Archivo → Ejecutar script SQL
-- ============================================================

CREATE DATABASE IF NOT EXISTS `portfolio_fotografia`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `portfolio_fotografia`;

-- ── Tablas ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS `categorias` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `nombre`      VARCHAR(100),
  `descripcion` TEXT,
  `slug`        VARCHAR(110)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `proyectos` (
  `id`             INT AUTO_INCREMENT PRIMARY KEY,
  `titulo`         VARCHAR(200),
  `descripcion`    TEXT,
  `imagen_portada` VARCHAR(500),
  `fecha`          DATE,
  `publicado`      TINYINT(1) DEFAULT 0,
  `categoria_id`   INT,
  `creado_en`      DATETIME DEFAULT NOW(),
  `actualizado`    DATETIME DEFAULT NOW(),
  FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `fotos` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `titulo`      VARCHAR(200),
  `url`         VARCHAR(500),
  `descripcion` TEXT,
  `orden`       INT DEFAULT 0,
  `proyecto_id` INT,
  `creado_en`   DATETIME DEFAULT NOW(),
  FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `etiquetas` (
  `id`     INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(80),
  `slug`   VARCHAR(90)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `foto_etiqueta` (
  `foto_id`     INT,
  `etiqueta_id` INT,
  PRIMARY KEY (`foto_id`, `etiqueta_id`),
  FOREIGN KEY (`foto_id`)     REFERENCES `fotos`(`id`)     ON DELETE CASCADE,
  FOREIGN KEY (`etiqueta_id`) REFERENCES `etiquetas`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `nombre`      VARCHAR(100),
  `email`       VARCHAR(150) UNIQUE,
  `contrasena`  VARCHAR(255),
  `rol`         ENUM('ADMIN','EDITOR') DEFAULT 'EDITOR',
  `creado_en`   DATETIME DEFAULT NOW(),
  `actualizado` DATETIME DEFAULT NOW()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `mensajes` (
  `id`        INT AUTO_INCREMENT PRIMARY KEY,
  `nombre`    VARCHAR(100)  NOT NULL,
  `email`     VARCHAR(150)  NOT NULL,
  `asunto`    VARCHAR(200),
  `mensaje`   TEXT          NOT NULL,
  `estado`    ENUM('nuevo','leido','respondido') DEFAULT 'nuevo',
  `creado_en` DATETIME DEFAULT NOW()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Categorías ────────────────────────────────────────────────

INSERT INTO `categorias` (`nombre`, `descripcion`, `slug`) VALUES
('Retrato',      'Fotografía de personas, expresiones y emociones humanas.',  'retrato'),
('Paisaje',      'Naturaleza, horizontes y espacios naturales.',               'paisaje'),
('Arquitectura', 'Edificios, estructuras y espacios urbanos.',                 'arquitectura'),
('Documental',   'Reportaje visual de escenas cotidianas y culturales.',       'documental'),
('Naturaleza',   'Flora, fauna y ecosistemas en su estado natural.',           'naturaleza');

-- ── Proyectos ─────────────────────────────────────────────────

INSERT INTO `proyectos` (`titulo`, `descripcion`, `imagen_portada`, `fecha`, `publicado`, `categoria_id`) VALUES
(
  'Miradas Urbanas',
  'Una colección de retratos capturados en las calles de Madrid. Cada imagen busca revelar la personalidad única de sus protagonistas en el contexto de la ciudad.',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&h=800&fit=crop',
  '2024-03-15', 1, (SELECT id FROM categorias WHERE slug = 'retrato')
),
(
  'Horizontes del Norte',
  'Un viaje fotográfico por las costas del Cantábrico. La luz grisácea y las olas persistentes crean una atmósfera única que solo existe en el norte de España.',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
  '2024-01-20', 1, (SELECT id FROM categorias WHERE slug = 'paisaje')
),
(
  'Geometrías de Acero',
  'Barcelona desde arriba y desde abajo. La arquitectura modernista y contemporánea ofrece formas, texturas y perspectivas que rara vez percibimos en el día a día.',
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=800&fit=crop',
  '2023-11-08', 1, (SELECT id FROM categorias WHERE slug = 'arquitectura')
),
(
  'El Mercado de las Flores',
  'Documental fotográfico sobre el mercado de flores de Valencia. Vendedoras, compradores y el ritual diario de quienes trabajan rodeados de color y fragancia.',
  'https://images.unsplash.com/photo-1487530811015-780fe4ccfc04?w=1200&h=800&fit=crop',
  '2023-07-22', 1, (SELECT id FROM categorias WHERE slug = 'documental')
),
(
  'Luz entre Pinos',
  'Las primeras horas de la mañana en el Parque Natural de la Sierra de Guadarrama. La niebla, la luz filtrada y el silencio absoluto componen escenas de belleza irreal.',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=800&fit=crop',
  '2024-05-10', 1, (SELECT id FROM categorias WHERE slug = 'naturaleza')
),
(
  'Retratos de Oficio',
  'Artesanos, cocineros, músicos callejeros. Personas que dedican su vida a un oficio con pasión. Un homenaje fotográfico al trabajo hecho con las manos.',
  'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=1200&h=800&fit=crop',
  '2022-09-14', 1, (SELECT id FROM categorias WHERE slug = 'retrato')
),
(
  'Costa Brava: Calas Secretas',
  'Una exploración de calas poco frecuentadas de la Costa Brava catalana. Trabajo en curso con material de la última expedición de primavera.',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop',
  '2025-04-03', 0, (SELECT id FROM categorias WHERE slug = 'paisaje')
),
(
  'Abandono Industrial',
  'Fábricas, naves y espacios industriales abandonados en la periferia de Bilbao. La belleza de la ruina y el paso del tiempo. Proyecto en edición final.',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
  '2022-04-18', 0, (SELECT id FROM categorias WHERE slug = 'documental')
);

-- ── Fotos ─────────────────────────────────────────────────────

INSERT INTO `fotos` (`titulo`, `url`, `orden`, `proyecto_id`) VALUES
('La sonrisa del metro',       'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=600&fit=crop', 1, (SELECT id FROM proyectos WHERE titulo = 'Miradas Urbanas')),
('Vendedor de castañas',       'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&h=600&fit=crop', 2, (SELECT id FROM proyectos WHERE titulo = 'Miradas Urbanas')),
('Ojos que cuentan historias', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop', 3, (SELECT id FROM proyectos WHERE titulo = 'Miradas Urbanas')),
('La lectora del parque',      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop', 4, (SELECT id FROM proyectos WHERE titulo = 'Miradas Urbanas'));

INSERT INTO `fotos` (`titulo`, `url`, `orden`, `proyecto_id`) VALUES
('Amanecer en Santander', 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop', 1, (SELECT id FROM proyectos WHERE titulo = 'Horizontes del Norte')),
('Marea baja en Zarautz',  'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=600&fit=crop', 2, (SELECT id FROM proyectos WHERE titulo = 'Horizontes del Norte')),
('Acantilados de Zumaia',  'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop', 3, (SELECT id FROM proyectos WHERE titulo = 'Horizontes del Norte'));

INSERT INTO `fotos` (`titulo`, `url`, `orden`, `proyecto_id`) VALUES
('Torre Agbar desde abajo',         'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&h=600&fit=crop', 1, (SELECT id FROM proyectos WHERE titulo = 'Geometrías de Acero')),
('Pasarela del Pabellón Barcelona', 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&h=600&fit=crop', 2, (SELECT id FROM proyectos WHERE titulo = 'Geometrías de Acero')),
('Fachada ventilada al atardecer',  'https://images.unsplash.com/photo-1481026469463-66327c86e544?w=800&h=600&fit=crop', 3, (SELECT id FROM proyectos WHERE titulo = 'Geometrías de Acero')),
('Escaleras de caracol',            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop', 4, (SELECT id FROM proyectos WHERE titulo = 'Geometrías de Acero'));

INSERT INTO `fotos` (`titulo`, `url`, `orden`, `proyecto_id`) VALUES
('Manos entre flores',     'https://images.unsplash.com/photo-1487530811015-780fe4ccfc04?w=800&h=600&fit=crop', 1, (SELECT id FROM proyectos WHERE titulo = 'El Mercado de las Flores')),
('Rosas del martes',       'https://images.unsplash.com/photo-1490750967868-88df5691cc13?w=800&h=600&fit=crop', 2, (SELECT id FROM proyectos WHERE titulo = 'El Mercado de las Flores')),
('La florista de siempre', 'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?w=800&h=600&fit=crop', 3, (SELECT id FROM proyectos WHERE titulo = 'El Mercado de las Flores'));

INSERT INTO `fotos` (`titulo`, `url`, `orden`, `proyecto_id`) VALUES
('Niebla matinal',              'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop', 1, (SELECT id FROM proyectos WHERE titulo = 'Luz entre Pinos')),
('Rayos de sol entre troncos',  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop', 2, (SELECT id FROM proyectos WHERE titulo = 'Luz entre Pinos')),
('Musgo y raíces',              'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=800&h=600&fit=crop', 3, (SELECT id FROM proyectos WHERE titulo = 'Luz entre Pinos')),
('Lago al amanecer',            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 4, (SELECT id FROM proyectos WHERE titulo = 'Luz entre Pinos'));

INSERT INTO `fotos` (`titulo`, `url`, `orden`, `proyecto_id`) VALUES
('El espadero de Toledo', 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=800&h=600&fit=crop', 1, (SELECT id FROM proyectos WHERE titulo = 'Retratos de Oficio')),
('Panadero a las 5 am',   'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop', 2, (SELECT id FROM proyectos WHERE titulo = 'Retratos de Oficio')),
('Músico del metro',      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop', 3, (SELECT id FROM proyectos WHERE titulo = 'Retratos de Oficio'));

INSERT INTO `fotos` (`titulo`, `url`, `orden`, `proyecto_id`) VALUES
('Cala Figuera al mediodía', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop', 1, (SELECT id FROM proyectos WHERE titulo = 'Costa Brava: Calas Secretas')),
('Agua transparente',        'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&h=600&fit=crop', 2, (SELECT id FROM proyectos WHERE titulo = 'Costa Brava: Calas Secretas'));

INSERT INTO `fotos` (`titulo`, `url`, `orden`, `proyecto_id`) VALUES
('Nave B, zona 3',           'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', 1, (SELECT id FROM proyectos WHERE titulo = 'Abandono Industrial')),
('Maquinaria olvidada',      'https://images.unsplash.com/photo-1565608438257-0fd84c6aa4a1?w=800&h=600&fit=crop', 2, (SELECT id FROM proyectos WHERE titulo = 'Abandono Industrial')),
('Ventana rota al exterior', 'https://images.unsplash.com/photo-1558980664-2cd663cf8f37?w=800&h=600&fit=crop',   3, (SELECT id FROM proyectos WHERE titulo = 'Abandono Industrial'));

-- ── Etiquetas ─────────────────────────────────────────────────

INSERT INTO `etiquetas` (`nombre`, `slug`) VALUES
('urbano',      'urbano'),
('natural',     'natural'),
('luz',         'luz'),
('sombra',      'sombra'),
('colorido',    'colorido'),
('minimalismo', 'minimalismo'),
('textura',     'textura'),
('nocturno',    'nocturno');

-- ── Relación foto-etiqueta ────────────────────────────────────

INSERT IGNORE INTO `foto_etiqueta` (`foto_id`, `etiqueta_id`)
SELECT f.id, e.id FROM fotos f, etiquetas e
WHERE (f.titulo = 'La sonrisa del metro'       AND e.slug IN ('urbano','luz'))
   OR (f.titulo = 'Vendedor de castañas'        AND e.slug IN ('urbano','colorido'))
   OR (f.titulo = 'Amanecer en Santander'       AND e.slug IN ('natural','luz'))
   OR (f.titulo = 'Acantilados de Zumaia'       AND e.slug IN ('natural','textura'))
   OR (f.titulo = 'Torre Agbar desde abajo'     AND e.slug IN ('minimalismo','textura'))
   OR (f.titulo = 'Escaleras de caracol'        AND e.slug IN ('minimalismo','sombra'))
   OR (f.titulo = 'Niebla matinal'              AND e.slug IN ('natural','luz'))
   OR (f.titulo = 'Rayos de sol entre troncos'  AND e.slug IN ('natural','luz'))
   OR (f.titulo = 'Nave B, zona 3'              AND e.slug IN ('sombra','textura'));

-- ── Usuarios ──────────────────────────────────────────────────
-- Contraseñas hasheadas con scrypt (salt:hash)
--   admin@portfolio.com  →  admin1234
--   elena@portfolio.com  →  editor1234
--   carlos@portfolio.com →  carlos1234

INSERT INTO `usuarios` (`nombre`, `email`, `contrasena`, `rol`) VALUES
(
  'Administrador',
  'admin@portfolio.com',
  '9955cebd1b125d14ca16f09111d9a88c:22546d0af551b77cd3a74f5e08a9276bc4912da6412aa1b26f9fd1fc2d1b3a094354637087f197018a2a76ecfd5dca225c3e2d78508439a547e298c858dfd18d',
  'ADMIN'
),
(
  'Elena Martínez',
  'elena@portfolio.com',
  'c74eaa96c8fb61773abb493dd9faf913:bfe6562df968a3bfd11e38cbf2227c91f940e2d5691dd49b80bbf45bed33ba828cc240a91db63af0d1b23c2820b7e83b36e181e9e1c2ade7d9888145186bc92c',
  'EDITOR'
),
(
  'Carlos Vega',
  'carlos@portfolio.com',
  'fa86ca1dbe07ccb41b6074491a97afb8:67c582eeb5276a79b1570d411f2400ace4a4e4ab77752f5d55dedf3eafed292bcc4c6671ce91a9e1ff4b51f198a4fca52950a97e4ba2ca3ca5539e13c8cffe6c',
  'EDITOR'
);

-- ── Mensajes de contacto ──────────────────────────────────────

INSERT INTO `mensajes` (`nombre`, `email`, `asunto`, `mensaje`, `estado`) VALUES
(
  'Laura García', 'laura.garcia@email.com',
  'Sesión de fotos para boda',
  'Hola! Me encanta tu trabajo, especialmente la serie de retratos urbanos. Estoy organizando mi boda para octubre y me gustaría saber si tienes disponibilidad y cuáles son tus tarifas para una sesión de 8 horas.',
  'respondido'
),
(
  'Carlos Mendoza', 'c.mendoza@empresa.es',
  'Fotografía corporativa',
  'Buenos días. Trabajo en una consultora de 40 personas y necesitamos renovar las fotos corporativas del equipo directivo. Podrías enviarnos un presupuesto para sesión en estudio y otra en nuestras oficinas?',
  'leido'
),
(
  'Ana Belén Torres', 'anabelen.torres@gmail.com',
  'Exposición en mi galería',
  'Soy propietaria de una galería de arte en el barrio de Malasaña, Madrid. La serie Miradas Urbanas me parece perfecta para la exposición de otoño. Podríamos hablar sobre una posible colaboración?',
  'nuevo'
),
(
  'Marcos Ruiz', 'marcos.ruiz.foto@outlook.com',
  'Consulta sobre técnica',
  'Hola, soy fotógrafo aficionado y me han impresionado mucho tus fotos de la serie de arquitectura. Qué objetivo usas habitualmente para ese tipo de tomas? Y qué ajustes de cámara recomiendas para interiores?',
  'nuevo'
),
(
  'Fundación Cultural Iberia', 'comunicacion@fundacion-iberia.org',
  'Colaboración para catálogo',
  'Nos ponemos en contacto desde la Fundación Cultural Iberia. Estamos preparando el catálogo de nuestra próxima exposición sobre el patrimonio industrial español y creemos que tu trabajo encaja perfectamente.',
  'leido'
);

-- ── Resumen ───────────────────────────────────────────────────

SELECT 'categorias' AS tabla, COUNT(*) AS filas FROM categorias
UNION ALL SELECT 'proyectos',  COUNT(*) FROM proyectos
UNION ALL SELECT 'fotos',      COUNT(*) FROM fotos
UNION ALL SELECT 'etiquetas',  COUNT(*) FROM etiquetas
UNION ALL SELECT 'usuarios',   COUNT(*) FROM usuarios
UNION ALL SELECT 'mensajes',   COUNT(*) FROM mensajes;
