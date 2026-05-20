import { Sequelize, DataTypes } from 'sequelize';

function createSequelize() {
  return new Sequelize(
    process.env.DB_NAME || 'portfolio_fotografia',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      dialect: 'mysql',
      logging: false,
    }
  );
}

const sequelize =
  process.env.NODE_ENV === 'production'
    ? createSequelize()
    : (global._sequelize ??= createSequelize());

// ── Models ────────────────────────────────────────────────────────────────────

const Usuario = sequelize.define(
  'Usuario',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: DataTypes.STRING(100),
    email: { type: DataTypes.STRING(150), unique: true },
    contrasena: DataTypes.STRING(255),
    rol: { type: DataTypes.ENUM('ADMIN', 'EDITOR'), defaultValue: 'EDITOR' },
    creado_en: DataTypes.DATE,
    actualizado: DataTypes.DATE,
  },
  { tableName: 'usuarios', timestamps: false }
);

const Categoria = sequelize.define(
  'Categoria',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: DataTypes.STRING(100),
    descripcion: DataTypes.TEXT,
    slug: DataTypes.STRING(110),
  },
  { tableName: 'categorias', timestamps: false }
);

const Proyecto = sequelize.define(
  'Proyecto',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: DataTypes.STRING(200),
    descripcion: DataTypes.TEXT,
    imagen_portada: DataTypes.STRING(500),
    fecha: DataTypes.DATEONLY,
    publicado: DataTypes.BOOLEAN,
    categoria_id: DataTypes.INTEGER,
    creado_en: DataTypes.DATE,
    actualizado: DataTypes.DATE,
  },
  { tableName: 'proyectos', timestamps: false }
);

const Foto = sequelize.define(
  'Foto',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: DataTypes.STRING(200),
    url: DataTypes.STRING(500),
    descripcion: DataTypes.TEXT,
    orden: { type: DataTypes.INTEGER, defaultValue: 0 },
    proyecto_id: DataTypes.INTEGER,
    creado_en: DataTypes.DATE,
  },
  { tableName: 'fotos', timestamps: false }
);

const Etiqueta = sequelize.define(
  'Etiqueta',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: DataTypes.STRING(80),
    slug: DataTypes.STRING(90),
  },
  { tableName: 'etiquetas', timestamps: false }
);

const Mensaje = sequelize.define(
  'Mensaje',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false },
    asunto: DataTypes.STRING(200),
    mensaje: { type: DataTypes.TEXT, allowNull: false },
    estado: {
      type: DataTypes.ENUM('nuevo', 'leido', 'respondido'),
      defaultValue: 'nuevo',
    },
    creado_en: DataTypes.DATE,
  },
  { tableName: 'mensajes', timestamps: false }
);

// ── Associations ──────────────────────────────────────────────────────────────

Proyecto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
Categoria.hasMany(Proyecto, { foreignKey: 'categoria_id' });

Foto.belongsTo(Proyecto, { foreignKey: 'proyecto_id', as: 'proyecto' });
Proyecto.hasMany(Foto, { foreignKey: 'proyecto_id', as: 'fotos' });

Foto.belongsToMany(Etiqueta, {
  through: 'foto_etiqueta',
  foreignKey: 'foto_id',
  otherKey: 'etiqueta_id',
  as: 'etiquetas',
});
Etiqueta.belongsToMany(Foto, {
  through: 'foto_etiqueta',
  foreignKey: 'etiqueta_id',
  otherKey: 'foto_id',
  as: 'fotos',
});

export { sequelize, Usuario, Categoria, Proyecto, Foto, Etiqueta, Mensaje };
export default sequelize;
