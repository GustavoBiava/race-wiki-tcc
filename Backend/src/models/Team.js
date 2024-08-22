import Sequelize, { Model } from "sequelize";

export default class Team extends Model {
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
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      first_participation: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
          isDate: {
            msg: 'Invalid date!',
          }
        }
      },
      team_chief: {
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
      technical_chief: {
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
      constructors_championships: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Not a Integer value!',
          }
        }
      },
      highest_race_finish: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Not a Integer value!',
          }
        }
      },
      times_highest_finish: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Not a Integer value!',
          }
        }
      },
      fastest_laps: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Not a Integer value!',
          }
        }
      },
      pole_positions: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Not a Integer value!',
          }
        }
      },
      main_color: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 20],
            msg: 'Invalid length (Min: 3, Max: 20)'
          }
        }
      },
      secondary_color: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 20],
            msg: 'Invalid length (Min: 3, Max: 20)'
          }
        }
      },
      power_unit: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 20],
            msg: 'Invalid length (Min: 3, Max: 20)'
          }
        }
      },
      base: {
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
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Driver, { through: 'career_contracts' });
    this.belongsToMany(models.Season, { through: 'team_classifications' });
  }

}

