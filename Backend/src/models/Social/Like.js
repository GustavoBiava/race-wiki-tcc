import Sequelize, { Model } from 'sequelize';

export default class Like extends Model{
  static init(sequelize) {
    super.init({
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
  }

}
