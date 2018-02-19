import crypto from 'crypto';
import PDFDocument from 'pdfkit';
import codes from 'rescode';
import moment from 'moment';
import Ticket from '../models/ticket_model';
import Activity from '../models/activity_model';
import ParentProfile from '../models/parent_model';


function generateTicketNumber(string) {
  const h = crypto.createHash('sha1');
  h.update(string);
  const len = 13;
  return parseInt(h.digest('hex').slice(0, len + 1), 16).toString().slice(0, len);
}

export function buyTicket(req, res, next) {
  const activityId = req.body.activityId;
  const profileId = req.user.profile.id;
  const ticket = new Ticket({
    activity: activityId,
    parent: profileId
  });
  // Generate ticket barcode number
  ticket.ticketNumber = generateTicketNumber(ticket.id);

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

export function generatePdf(req, res, next) {
  const ticketId = req.params.ticketId;
  Ticket.findById(ticketId).populate('parent')
                           .populate({ path: 'activity', populate: { path: 'provider' }})
                           .exec((err, ticket) => {
    if (err) return next(err);

    const parentFullname = `${ticket.parent.name} ${ticket.parent.surname}`;
    const price = ticket.activity.price;
    const activityName = ticket.activity.name;
    const activityDate = moment(ticket.activity.date).format('DD-MM-YYYY, Ώρα: HH:mm');
    const providerBrand = ticket.activity.provider.brand_name;
    const date = moment(Date.now()).format('YYYY-MM-DD');
    const ticketNumber = ticket.ticketNumber;

    codes.loadModules(['ean2', 'ean5', 'ean8', 'ean13']);
    const barcodeImg = codes.create('ean13', ticketNumber);

    const doc = new PDFDocument();
    doc.registerFont('font', 'server/fonts/dejavusans.ttf');
    doc.fontSize(24);
    doc.text('PLAYGROUND E-TICKET').moveDown(1);
    doc.fontSize(16);
    doc.image(barcodeImg, 400, 58, { width: 130, heigth: 10 });
    doc.font('font').text(`ΟΝΟΜΑΤΕΠΩΝΥΜΟ: ${parentFullname}`).moveDown(0.5);
    doc.font('font').text(`ΔΡΑΣΤΗΡΙΟΤΗΤΑ: ${activityName}`).moveDown(0.5);
    doc.font('font').text(`ΠΑΡΟΧΟΣ: ${providerBrand}`).moveDown(0.5);
    doc.font('font').text(`ΤΙΜΗ ΕΙΣΙΤΗΡΙΟΥ: ${price}€`).moveDown(0.5);
    doc.font('font').text(`ΗΜΕΡΟΜΗΝΙΑ: ${activityDate}`);

    const filename = `ticket-${date}.pdf`;
    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);
    return doc.end();
  });
}

export default {
  buyTicket,
  generatePdf
};
