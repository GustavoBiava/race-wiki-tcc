import Sequelize, { Model } from 'sequelize';

import slugify from 'slugify';

export default class Tag extends Model{
  static init(sequelize) {
    super.init({
      tag_name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [],
            msg: 'Tag_name invalid length (Min: 3, Max: 40)',
          }
        }
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      type: {
        type: Sequelize.ENUM('DRIVER', 'TEAM'),
        allowNull: false,
        validate: {
          is: {
            args: /driver|team/gi,
            msg: 'Type invalid value! (DRIVER OR TEAM)'
          }
        }
      },
    }, { sequelize });

    this.addHook('beforeSave', (tag) => {
      if (tag.tag_name) {
        tag.slug = slugify(tag.tag_name).toLowerCase();
      }

      if (tag.type) {
        tag.type = tag.type.toUpperCase();
      }

    })

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Publication, { through: 'tags_publications' });
  }

}
