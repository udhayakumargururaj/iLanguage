const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('verb', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

const connectMySql = async () => {
  console.log('inside connecting');
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    sequelize.close();
  }
}

const VerbMapper = sequelize.define("verbmapper", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  rootverb: DataTypes.TEXT,
  simplepast: DataTypes.TEXT,
  pastparticiple: DataTypes.TEXT,
  thridpersonpresent: DataTypes.TEXT
}, {
  freezeTableName: true
});

const addThirdPartySingular = async (record) => {
  console.log('record', record);
  const verb = await VerbMapper.create(record, { fields: ['thridpersonpresent'] });
  await verb.save()
  console.log("thridpersonpresent:", verb.thridpersonpresent);
}

connectMySql();

module.exports = {
  addThirdPartySingular
}

