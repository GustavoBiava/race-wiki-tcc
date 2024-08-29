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
            msg: 'Name invalid length (Min: 3, Max: 50)'
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
          is: {
            args: /^\d{4}(-\d{2}(-\d{2})?)?$/,
            msg: 'first_participation is not a valid Date (YYYY-MM-DD)',
          },
        }
      },
      team_chief: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Team_chief invalid length (Min: 3, Max: 50)'
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
            msg: 'Technical_chief invalid length (Min: 3, Max: 50)'
          }
        }
      },
      constructors_championships: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Constructors_championships not a Integer value!',
          }
        }
      },
      highest_race_finish: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Highest_race_finish not a Integer value!',
          }
        }
      },
      times_highest_finish: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Times_highest_finish not a Integer value!',
          }
        }
      },
      fastest_laps: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Fastest_laps not a Integer value!',
          }
        }
      },
      pole_positions: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Pole_positions not a Integer value!',
          }
        }
      },
      main_color: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [4, 20],
            msg: 'Main_color invalid length (Min: 4, Max: 20)'
          }
        }
      },
      secondary_color: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [4, 20],
            msg: 'Secondary_color invalid length (Min: 4, Max: 20)'
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
            msg: 'Power_unit invalid length (Min: 3, Max: 20)'
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
            msg: 'Base invalid length (Min: 3, Max: 50)'
          }
        }
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Driver, { through: 'career_contracts', foreignKey: 'team_id', as: 'team' });
    this.belongsToMany(models.Season, { through: 'team_classifications' });
    this.belongsToMany(models.Race, { through: 'team_race_results' });
    this.hasMany(models.Season, { foreignKey: 'team_id' });
  }

}

