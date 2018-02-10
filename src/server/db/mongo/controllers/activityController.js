import Activity from '../models/activity_model';

export function postActivity(req, res, next) {
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
  });

  activity.save((err) => {
    if (err) return next(err);
    return res.sendStatus(200);
  });
}

export default {
  postActivity
};

