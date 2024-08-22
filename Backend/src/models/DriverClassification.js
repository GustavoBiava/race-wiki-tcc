import Sequelize, { Model } from "sequelize";

export default class DriverClassification extends Model {
  static init(sequelize) {
    super.init({
      season_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'seasons',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      driver_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'drivers',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Not a integer value!',
          }
        }
      },
      points: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          isFloat: {
            msg: 'Not a float value!',
          }
        }
      },
    }, { sequelize });
    return this;
  }
}
