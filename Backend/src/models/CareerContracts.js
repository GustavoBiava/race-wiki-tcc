import Sequelize, { Model } from "sequelize";

export default class CareerContracts extends Model {
  static init(sequelize) {
    super.init({
      driver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'drivers',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      begin_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'Invalid Date!',
          }
        }
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'Invalid Date!',
          }
        }
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, { sequelize });
    return this;
  }
}
