import Ticket from '../models/ticket_model';
import Activity from '../models/activity_model';
import ParentProfile from '../models/parent_model';

export function buyTicket(req, res, next) {
  const activityId = req.body.activityId;
  const profileId = req.user.profile.id;
  const parentId = req.user.id;
  const ticket = new Ticket({
    ticketId: '1234', // actually, derive it from mongo id
    activity: activityId,
    parent: parentId
  });

  Activity.findById(activityId, (err, data) => {
    if (!data) return res.status(400).send('Unavailable activity');
    if (err) return next(err);
    if (data.available_tickets <= 0) return res.status(400).send('Sold out');
    return data.update({ $inc: { available_tickets: -1 } }, (err) => {
      if (err) return next(err);
      ticket.save((err) => {
        if (err) return next(err);
        return ParentProfile.findByIdAndUpdate(
          profileId, { $push: { tickets: ticket} }, { new: true }, (err, profile) => {
          if (err) return next(err);
          return res.send(profile);
        });
      });
    });
  });
}

export default {
  buyTicket
};
