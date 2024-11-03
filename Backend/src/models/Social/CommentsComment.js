import Sequelize, { Model } from 'sequelize';

export default class CommentsComment extends Model{
  static init(sequelize) {
    super.init({
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
      comment_id: {
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
            msg: 'Comment_id need to be a integer!',
          }
        }
      },
    }, { sequelize });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Comment, { foreignKey: 'comment_id', as: 'responses' });
  }

}
