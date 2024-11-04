import Publication from '../../models/Social/Publication';
import User from '../../models/Auth/User';
import PublictionPicture from '../../models/Pictures/PublicationPicture';
import Tag from '../../models/Social/Tag';
import TagsPublication from '../../models/Social/TagsPublication';
import Comment from '../../models/Social/Comment';
import Driver from '../../models/Driver';
import DriverPicture from '../../models/Pictures/DriverPicture';
import CareerContracts from '../../models/CareerContracts';
import Team from '../../models/Team';
import CommentsComment from '../../models/Social/CommentsComment';


class PublicationPageController {

  async getPublication(req, res) {
    try {
      const { slug } = req.params;
      if (!slug) return res.status(400).json({ message: ['Invalid Slug!'] });

      const publication = await Publication.findOne({
        where: { slug },
        attributes: ['id', 'title', 'body', 'likes', 'created_at'],
        include: [
          {
            model: User,
            as: 'publication_author',
            attributes: ['nickname'],
          },
          {
            model: PublictionPicture,
            as: 'publication_picture',
            attributes: ['url', 'filename']
          },
        ]
      });

      const tagsPublications = await TagsPublication.findAll({
        where: { publication_id: publication.id },
        attributes: ['id'],
        include: [
          {
            model: Tag,
            attributes: ['tag_name', 'slug']
          }
        ]
      });

      const tags = [];

      tagsPublications.forEach((tagsPublication) => {
        tags.push(tagsPublication.Tag);
      });

      publication.setDataValue('tags', tags);

      const publicationComments = await Comment.findAll({
        where: { publication_id: publication.id },
        attributes: ['id', 'title', 'body', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
          {
            model: User,
            attributes: ['id', 'nickname', 'favorite_driver'],
            include: [
              {
                model: Driver,
                attributes: ['id'],
                include: [
                  {
                    model: DriverPicture,
                    as: 'driver_picture',
                    attributes: ['url', 'filename'],
                  }
                ]
              },
            ]
          },
          {
            model: CommentsComment,
            as: 'responses',
            attributes: ['body', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
              {
                model: User,
                attributes: ['id', 'nickname', 'favorite_driver'],
                include: [
                  {
                    model: Driver,
                    attributes: ['id'],
                    include: [
                      {
                        model: DriverPicture,
                        as: 'driver_picture',
                        attributes: ['url', 'filename'],
                      }
                    ]
                  },
                ]
              },
            ]
          }
        ]
      });

      await Promise.all(publicationComments.map(async (publicationComment) => {
        const driverContracts = await CareerContracts.findAll({
          where: { driver_id: publicationComment.User.favorite_driver, is_active: 1 },
          order: [['created_at', 'DESC']],
        });

        const driverContract = driverContracts[0];

        if (!driverContract) return publicationComment.User.setDataValue('color', null);

        if (!driverContract.is_active) return publicationComment.User.setDataValue('color', null);

        const { main_color } = await Team.findOne({
          where: { id: driverContract.team_id }
        });

        publicationComment.User.setDataValue('color', main_color);

      }));

      await Promise.all(publicationComments.map(async (publicationComment) => {
        await Promise.all(publicationComment.responses.map(async (response) => {
          const driverContracts = await CareerContracts.findAll({
            where: { driver_id: response.User.favorite_driver, is_active: 1 },
            order: [['created_at', 'DESC']],
          });

          const driverContract = driverContracts[0];

          if (!driverContract) return response.User.setDataValue('color', null);

          if (!driverContract.is_active) return response.User.setDataValue('color', null);

          const { main_color } = await Team.findOne({
            where: { id: driverContract.team_id }
          });

          response.User.setDataValue('color', main_color);

        }));
      }));

      publication.setDataValue('comments', publicationComments);

      return res.status(200).json(publication);

    }
    catch (err) {
      console.log(err)
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

}

export default new PublicationPageController();
