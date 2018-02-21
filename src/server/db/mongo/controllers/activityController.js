import Activity from '../models/activity_model';
import ProviderProfile from '../models/provider_model';

export function postActivity(req, res, next) {
  const profileId = req.user.profile.id;
  const activity = new Activity({
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    date: req.body.date,
    photo: req.body.photo,
    total_tickets: req.body.total_tickets,
    available_tickets: req.body.total_tickets,
    min_age: req.body.min_age,
    max_age: req.body.max_age,
    tags: req.body.tags,
    price: req.body.price,
    provider: profileId
  });


  activity.save((err) => {
    if (err) return next(err);

    ProviderProfile.findByIdAndUpdate(profileId, { $push: { "activities": activity } }, { new: true}, (err, profile) => {
       if (err) return next(err);
    });
    return res.sendStatus(200);
   });
}

// TODO Currently the functionality very limited
export function getAllActivities(req, res, next) {
  Activity.find({}, (err, activities) => {
    if (err) return next(err);
    return res.send(activities);
  });
}

export default {
  postActivity,
  getAllActivities
};
