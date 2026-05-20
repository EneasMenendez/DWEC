/**
 * Ejecutado automáticamente en cada `npm run dev` y `npm run build`.
 * - Genera AUTH_SECRET en .env.local si no existe.
 * - Inicializa la base de datos con los datos de scripts/data.json.
 */

const { randomBytes, scrypt } = require('crypto');
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');
const mariadb = require('mariadb');

const scryptAsync = promisify(scrypt);
const envPath = resolve(process.cwd(), '.env.local');

// ── AUTH_SECRET ────────────────────────────────────────────────────────────────

let content = '';
try { content = readFileSync(envPath, 'utf-8'); } catch { /* se creará */ }

if (content.includes('AUTH_SECRET=cambia_esto') || !content.includes('AUTH_SECRET=')) {
  const secret = randomBytes(32).toString('hex');
  content = content.includes('AUTH_SECRET=')
    ? content.replace(/AUTH_SECRET=.*/, `AUTH_SECRET=${secret}`)
    : content + `\nAUTH_SECRET=${secret}\n`;
  writeFileSync(envPath, content, 'utf-8');
  console.log('AUTH_SECRET generado y guardado en .env.local');
} else {
  console.log('AUTH_SECRET ya estaba configurado.');
}

// ── Leer .env.local ────────────────────────────────────────────────────────────

function loadEnv() {
  const vars = {};
  try {
    for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const eq = t.indexOf('=');
      if (eq === -1) continue;
      vars[t.slice(0, eq).trim()] = t.slice(eq + 1).trim();
    }
  } catch { /* usa defaults */ }
  return vars;
}

async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = await scryptAsync(password, salt, 64);
  return `${salt}:${hash.toString('hex')}`;
}

// ── Esquema de tablas ──────────────────────────────────────────────────────────

const CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS categorias (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100),
  descripcion TEXT,
  slug        VARCHAR(110)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS proyectos (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  titulo         VARCHAR(200),
  descripcion    TEXT,
  imagen_portada VARCHAR(500),
  fecha          DATE,
  publicado      TINYINT(1) DEFAULT 0,
  categoria_id   INT,
  creado_en      DATETIME DEFAULT NOW(),
  actualizado    DATETIME DEFAULT NOW(),
  FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS fotos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  titulo      VARCHAR(200),
  url         VARCHAR(500),
  descripcion TEXT,
  orden       INT DEFAULT 0,
  proyecto_id INT,
  creado_en   DATETIME DEFAULT NOW(),
  FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS etiquetas (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80),
  slug   VARCHAR(90)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS foto_etiqueta (
  foto_id      INT,
  etiqueta_id  INT,
  PRIMARY KEY (foto_id, etiqueta_id),
  FOREIGN KEY (foto_id)     REFERENCES fotos(id)     ON DELETE CASCADE,
  FOREIGN KEY (etiqueta_id) REFERENCES etiquetas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS usuarios (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100),
  email       VARCHAR(150) UNIQUE,
  contrasena  VARCHAR(255),
  rol         ENUM('ADMIN','EDITOR') DEFAULT 'EDITOR',
  creado_en   DATETIME DEFAULT NOW(),
  actualizado DATETIME DEFAULT NOW()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS mensajes (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nombre    VARCHAR(100)  NOT NULL,
  email     VARCHAR(150)  NOT NULL,
  asunto    VARCHAR(200),
  mensaje   TEXT          NOT NULL,
  estado    ENUM('nuevo','leido','respondido') DEFAULT 'nuevo',
  creado_en DATETIME DEFAULT NOW()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

// ── Inicializar BD ─────────────────────────────────────────────────────────────

async function initDB() {
  const env = loadEnv();
  const host     = env.DB_HOST     || '127.0.0.1';
  const port     = parseInt(env.DB_PORT || '3306');
  const database = env.DB_NAME     || 'portfolio_fotografia';
  const user     = env.DB_USER     || 'root';
  const password = env.DB_PASSWORD || '';

  const { categorias, proyectos, fotos, etiquetas, foto_etiquetas, usuarios, mensajes } =
    JSON.parse(readFileSync(resolve(process.cwd(), 'scripts/data.json'), 'utf-8'));

  const pool = mariadb.createPool({ host, port, user, password, multipleStatements: true });
  let conn;

  try {
    conn = await pool.getConnection();
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await conn.query(`USE \`${database}\``);
    console.log(`Base de datos "${database}" lista.`);

    await conn.query(CREATE_TABLES);
    console.log('Tablas creadas / verificadas.');

    const [{ total }] = await conn.query('SELECT COUNT(*) AS total FROM proyectos');
    if (Number(total) > 0) {
      console.log(`Ya hay ${total} proyectos. Sin cambios en los datos.`);
      const [{ admins }] = await conn.query("SELECT COUNT(*) AS admins FROM usuarios WHERE rol = 'ADMIN'");
      if (Number(admins) === 0) {
        const admin = usuarios.find(u => u.rol === 'ADMIN');
        if (admin) {
          const hashed = await hashPassword(admin.contrasena);
          await conn.query(
            "INSERT INTO usuarios (nombre, email, contrasena, rol) VALUES (?, ?, ?, 'ADMIN')",
            [admin.nombre, admin.email, hashed]
          );
          console.log(`Usuario admin creado: ${admin.email} / ${admin.contrasena}`);
        }
      }
      return;
    }

    // Categorías
    const catIds = {};
    for (const cat of categorias) {
      const res = await conn.query(
        'INSERT INTO categorias (nombre, descripcion, slug) VALUES (?, ?, ?)',
        [cat.nombre, cat.descripcion, cat.slug]
      );
      catIds[cat.slug] = Number(res.insertId);
    }
    console.log(`${categorias.length} categorías insertadas.`);

    // Proyectos
    const proyIds = {};
    for (const p of proyectos) {
      const res = await conn.query(
        `INSERT INTO proyectos (titulo, descripcion, imagen_portada, fecha, publicado, categoria_id, creado_en, actualizado)
         VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [p.titulo, p.descripcion, p.imagen_portada, p.fecha, p.publicado ? 1 : 0, catIds[p.categoria_slug] || null]
      );
      proyIds[p.titulo] = Number(res.insertId);
    }
    console.log(`${proyectos.length} proyectos insertados.`);

    // Fotos
    const fotoIds = {};
    for (const f of fotos) {
      const res = await conn.query(
        'INSERT INTO fotos (titulo, url, orden, proyecto_id, creado_en) VALUES (?, ?, ?, ?, NOW())',
        [f.titulo, f.url, f.orden, proyIds[f.proyecto] || null]
      );
      fotoIds[f.titulo] = Number(res.insertId);
    }
    console.log(`${fotos.length} fotos insertadas.`);

    // Etiquetas
    const etiqIds = {};
    for (const e of etiquetas) {
      const res = await conn.query(
        'INSERT INTO etiquetas (nombre, slug) VALUES (?, ?)',
        [e.nombre, e.slug]
      );
      etiqIds[e.slug] = Number(res.insertId);
    }
    console.log(`${etiquetas.length} etiquetas insertadas.`);

    // Relaciones foto-etiqueta
    for (const rel of foto_etiquetas) {
      const fotoId = fotoIds[rel.foto];
      if (!fotoId) continue;
      for (const slug of rel.etiquetas) {
        if (etiqIds[slug]) {
          await conn.query(
            'INSERT IGNORE INTO foto_etiqueta (foto_id, etiqueta_id) VALUES (?, ?)',
            [fotoId, etiqIds[slug]]
          );
        }
      }
    }
    console.log('Relaciones foto-etiqueta insertadas.');

    // Usuarios
    for (const u of usuarios) {
      const hashed = await hashPassword(u.contrasena);
      await conn.query(
        'INSERT INTO usuarios (nombre, email, contrasena, rol) VALUES (?, ?, ?, ?)',
        [u.nombre, u.email, hashed, u.rol]
      );
    }
    console.log(`${usuarios.length} usuarios insertados.`);
    for (const u of usuarios) console.log(`  → ${u.email.padEnd(28)} / ${u.contrasena}`);

    // Mensajes
    for (const m of mensajes) {
      await conn.query(
        'INSERT INTO mensajes (nombre, email, asunto, mensaje, estado) VALUES (?, ?, ?, ?, ?)',
        [m.nombre, m.email, m.asunto, m.mensaje, m.estado]
      );
    }
    console.log(`${mensajes.length} mensajes insertados.`);

    console.log('\n✓ Base de datos lista con datos de ejemplo.');

  } catch (err) {
    console.error('Error al inicializar la BD:', err.message);
  } finally {
    if (conn) conn.release();
    await pool.end();
  }
}

initDB().catch(() => {
  console.warn('Aviso: no se pudo conectar a la base de datos durante el setup.');
  console.warn('Asegúrate de que MariaDB/MySQL está en marcha antes de arrancar la app.');
});