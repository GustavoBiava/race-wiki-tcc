import Sequelize, { Model } from 'sequelize';
import slugify from 'slugify';

export default class Publication extends Model{
  static init(sequelize) {
    super.init({
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [4, 70],
            msg: 'Title invalid value! (Min: 4, Max: 70)',
          }
        }
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Likes is not a integer value!',
          }
        }
      },
      author: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Author need to be a integer!',
          }
        }
      },
    }, { sequelize });

    this.addHook('beforeSave', (publication) => {
      if (publication.title) {
        publication.slug = slugify(publication.title).toLowerCase();
      }
    })

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'author' });
    this.belongsToMany(models.User, { through: 'likes' });
    this.belongsToMany(models.User, { through: 'comments' });
  }

}
