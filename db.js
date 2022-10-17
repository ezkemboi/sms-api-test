
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.sqlite'
});

const Question = sequelize.define('Question', {
  question: DataTypes.STRING,
  choices: DataTypes.ARRAY(DataTypes.STRING),
});

export {
  Question,
  sequelize
}
