import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Search = sequelize.define('neVnotas', {});
const Detail = sequelize.define('nenota_cobertura', {  
  cnota: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
}, { tableName: 'nenota_cobertura' });

const searchHedgingNotes = async () => {
    try {
      const searchHedgingNotes = await Search.findAll({
        attributes: ['cnota', 'xcedente', 'xasegurado', 'fdesde', 'fhasta', 'xmarca'],
      });
      const search = searchHedgingNotes.map((item) => item.get({ plain: true }));
      return search;
    } catch (error) {
      return { error: error.message };
    }
};

const detailHedgingNotes = async (detailHedgingNotes) => {
  try {
    const detailQuery = await Detail.findOne({
      where: detailHedgingNotes,
      attributes: ['cnota', 'xtipo', 'xasegurado', 'xdireccion', 'xcedente', 'xdireccion_ced', 'fdesde', 'fhasta', 'xinteres',
                   'xmarca', 'xmatricula', 'xserial', 'nano', 'nasientos', 'nasientos_tripulantes', 'xdatos_tecnicos', 'xlimites',
                   'xcondiciones', 'xprimas_tasas', 'xterminos'],
    });
    const detail = detailQuery ? detailQuery.get({ plain: true }) : null;
    return detail;
  } catch (error) {
    console.log(error)
    return { error: error.message, message: 'Ha ocurrido un error al recuperar información del usuario solicitado' };
  }
};

export default {
    searchHedgingNotes,
    detailHedgingNotes
};