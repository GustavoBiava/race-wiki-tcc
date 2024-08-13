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
            msg: 'Invalid length (Min: 3, Max: 50)'
          }
        }
      },
      first_apparition: {
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
      circuit_length: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isFloat: {
            msg: 'Not a float value'
          }
        }

      },
      fastest_lap_record: {
        type: Sequelize.TIME,
        allowNull: true,
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Race, { foreignKey: 'circuit_id' });
  }

}
