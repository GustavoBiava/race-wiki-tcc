import Sequelize, { Model } from "sequelize";

export default class Season extends Model {
  static init(sequelize) {
    super.init({
      year: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
          isDate: {
            args: true,
            msg: 'Invalid date!',
          },
        }
      },
      begin_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
          isDate: {
            args: true,
            msg: 'Invalid date!',
          },
        }
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
          isDate: {
            args: true,
            msg: 'Invalid date!',
          },
        }
      },
    }, { sequelize });
    return this;
  }
}
