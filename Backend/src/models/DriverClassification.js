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
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Season_id need to be a integer!',
          }
        }
      },
      driver_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'drivers',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Driver_id need to be a integer!',
          }
        }
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1,
        validate: {
          isInt: {
            msg: 'Position not a integer value!',
          }
        }
      },
      points: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          isFloat: {
            msg: 'Points not a float value!',
          }
        }
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Driver, { foreignKey: 'driver_id' });
    this.belongsTo(models.Season, { foreignKey: 'season_id' });
  }

}
