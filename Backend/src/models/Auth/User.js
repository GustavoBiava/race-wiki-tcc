import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 30],
            msg: 'Nickname invalid length! (Min: 3, Max: 30)',
          }
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 30],
            msg: 'Name invalid length! (Min: 3, Max: 30)',
          }
        }
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 50],
            msg: 'Surname invalid length! (Min: 3, Max: 50)',
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Invalid email!',
          }
        }
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        allowNull: false,
        validate: {
          is: {
            args: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            msg: 'Password must have at least one: Uppercase and Lowercase character, special characters and Numbers!',
          }
        }
      },
      birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          is: {
            args: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
            msg: 'Birth_date is not a valid Date (YYYY-mm-dd)',
          },
        }
      },
      type: {
        type: Sequelize.ENUM('NORMAL', 'ADMIN'),
        allowNull: false,
        defaultValue: 'NORMAL',
        validate: {
          is: {
            args: /normal|admin/gi,
            msg: 'Type invalid value! (NORMAL or ADMIN)'
          }
        }
      },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'PENDING', 'DISABLED'),
        allowNull: false,
        defaultValue: 'PENDING',
        validate: {
          is: {
            args: /active|pending|disabled/gi,
            msg: 'Status invalid value! (ACTIVE, PENDING and DISABLED)'
          }
        }
      },
      favorite_driver: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'drivers',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Favorite_driver need to be a integer!',
          }
        }
      },
      favorite_team: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'teams',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Favorite_team need to be a integer!',
          }
        }
      },
      race_level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Race_level is not a integer!',
          }
        }
      },
      race_points: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isFloat: {
            msg: 'Race_points is not a integer!',
          }
        }
      },
    }, { sequelize });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 10);
      }
    });

    return this;
  }

  validatePassword(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(models.Driver, { foreignKey: 'favorite_driver' });
    this.belongsTo(models.Team, { foreignKey: 'favorite_team' });
  }

}
