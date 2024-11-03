import Sequelize, { Model } from 'sequelize';

export default class Comment extends Model {
  static init(sequelize) {
    super.init({
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [],
            msg: 'Title invalid length! (Min: 3, Max: 25)',
          }
        }
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'User_id need to be a integer!',
          }
        }
      },
      publication_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'publications',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Publication_id need to be a integer!',
          }
        }
      },
    }, { sequelize });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Publication, { foreignKey: 'publication_id' });
    this.belongsToMany(models.User, { through: 'comments_comments' });
    this.hasMany(models.CommentsComment, { foreignKey: 'comment_id', as: 'responses' });
  }

}
