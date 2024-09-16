import Sequelize, { Model } from 'sequelize';

export default class TagsPublication extends Model{
  static init(sequelize) {
    super.init({
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
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Tag_id need to be a integer!',
          }
        }
      },
    }, { sequelize });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Tag, { foreignKey: 'tag_id' });
    this.belongsTo(models.Publication, { foreignKey: 'publication_id' });
  }

}
