import Sequelize, { Model } from "sequelize";

export default class TeamRaceResult extends Model {
  static init(sequelize) {
    super.init({
      team_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      race_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'races',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Not a integer value',
          }
        }
      },
      laps: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Not a integer value',
          }
        }
      },
      points: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          msg: 'Not a double value',
        }
      },
    }, { sequelize });
    return this;
  }
}
