import path from 'path';
import Activity from '../models/activity_model';
import ProviderProfile from '../models/provider_model';

export function postActivity(req, res, next) {
  // TODO maybe perform some error checking
  const formName = 'newActivityForm.post';
  const profileId = req.user.profile.id;
  const photoData = req.file.buffer;
  const photoType = req.file.mimetype;
  const activity = new Activity({
    name: req.body[formName + '.name'],
    location: req.body[formName + '.location'].split(',').map(x => parseFloat(x)),
    description: req.body[formName + '.description'],
    date: req.body[formName + '.date'],
    photo: {
      data: photoData,
      contentType: photoType
    },
    total_tickets: req.body[formName + '.total_tickets'],
    available_tickets: req.body[formName + '.total_tickets'],
    min_age: req.body[formName + '.min_age'],
    max_age: req.body[formName + '.max_age'],
    tags: req.body['user.tags'],
    price: req.body[formName + '.price'],
    provider: profileId
  });


  activity.save((err) => {
    if (err) return next(err);

    return ProviderProfile.findByIdAndUpdate(profileId, { $push: { activities: activity } }, { new: true}, (err, profile) => {
       if (err) return next(err);
       return res.sendStatus(200);
    });
  });
}

// TODO Currently the functionality very limited
export function getAllActivities(req, res, next) {
  Activity.find({}, (err, activities) => {
    if (err) return next(err);
    const activitiesWithPhoto = activities.map((a) => {
      const activity = a.toJSON();
      const photoPath = path.join('/api/activity', activity.id, '/photo');
      return Object.assign({}, activity, { photo: photoPath });
    });
    return res.send(activitiesWithPhoto);
  });
}

export function getActivity(req, res, next) {
  const activityId = req.params.activityId;
  Activity.findById(activityId, (err, activity) => {
    if (err) return next(err);
    const photoPath = path.join('/api/activity', activity.id, '/photo');
    const activityUpdated = Object.assign({}, activity.toJSON(), { photo: photoPath });
    return res.send(activityUpdated);
  });
}

export function getActivityPhoto(req, res, next) {
  const activityId = req.params.activityId;
  Activity.findById(activityId, (err, activity) => {
    if (err) return next(err);
    const photoData = activity.photo.data;
    if (photoData) {
      const contentType = activity.photo.contentType || 'application/octet-stream';
      res.setHeader('Content-type', contentType);
      return res.send(photoData);
    }
    return res.sendStatus(404);
  });
}

export default {
  postActivity,
  getActivity,
  getActivityPhoto,
  getAllActivities
};
