import Sequelize, { Model } from "sequelize";

export default class Driver extends Model {
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
      surname: {
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
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      height: {
        type: Sequelize.FLOAT,
        allowNull:false,
        validate: {
          isFloat: {
            msg: 'Not a Float value!',
          }
        }
      },
      nationality: {
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
      birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'Invalid date!',
          }
        }
      },
      birth_place: {
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
      short_name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 10],
            msg: 'Invalid length (Min: 3, Max: 10)'
          }
        }
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.DriverStat);
    this.belongsToMany(models.Team, { through: 'career_contracts' });
  }

}
