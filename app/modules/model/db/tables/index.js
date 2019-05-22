// import Sequelize from 'sequelize';

import sequelize from 'modules/model/db/sequelize';
// import { create as createOrderRecordModel } from './orderrecord';

// const OrderRecord = createOrderRecordModel(sequelize, Sequelize);

const models = sequelize.models;

// OrderRecord.associate(models);

export default models;
