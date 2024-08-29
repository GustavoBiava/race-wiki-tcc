import Sequelize, { Model } from "sequelize";

export default class Circuit extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Name invalid length (Min: 3, Max: 50)'
          }
        }
      },
      first_apparition: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
          is: {
            args: /^\d{4}(-\d{2}(-\d{2})?)?$/,
            msg: 'first_apparition is not a valid Date (YYYY-MM-DD)',
          },
        }
      },
      circuit_length: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isFloat: {
            msg: 'Circuit_length not a float value'
          }
        }
      },
      fastest_lap_record: {
        type: Sequelize.TIME,
        allowNull: true,
        validate: {
          is: {
            args: /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
            msg: 'Fastest_lap_record is not a valid Time (HH:mm:ss)',
          },
        }
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Race, { foreignKey: 'circuit_id' });
  }

}
